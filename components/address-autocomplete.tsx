"use client"

import React, { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddressSuggestion {
  label: string
  city: string
  postcode: string
  context: string
}

interface AddressAutocompleteProps {
  value: string
  onChange: (address: string, postcode?: string, city?: string) => void
  onPostcodeChange?: (postcode: string) => void
  onCityChange?: (city: string) => void
  label?: string
  required?: boolean
  id?: string
}

export function AddressAutocomplete({
  value,
  onChange,
  onPostcodeChange,
  onCityChange,
  label = "Adresse",
  required = false,
  id = "adresse",
}: AddressAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout>()
  const justSelectedRef = useRef(false)

  const searchAddress = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      // Nettoyer la requête : remplacer "à", "a", "au" par rien pour améliorer la recherche
      const cleanedQuery = query
        .replace(/\b(à|a|au|aux)\b/gi, '')
        .replace(/\s+/g, ' ')
        .trim()

      // Utilisation de l'API Adresse de la Base Adresse Nationale (BAN)
      // Augmenter la limite et ne pas utiliser autocomplete pour avoir plus de résultats
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(cleanedQuery)}&limit=15`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()

      if (data.features && Array.isArray(data.features) && data.features.length > 0) {
        const formattedSuggestions: AddressSuggestion[] = data.features.map((feature: any) => {
          // Utiliser "name" (adresse seule) au lieu de "label" (adresse + code postal + ville)
          const addressOnly = feature.properties.name || feature.properties.label?.split(/\s+\d{5}\s+/)[0] || feature.properties.label
          return {
            label: addressOnly,
            city: feature.properties.city,
            postcode: feature.properties.postcode,
            context: feature.properties.context,
          }
        })
        setSuggestions(formattedSuggestions)
      } else {
        // Si pas de résultats, essayer sans nettoyage
        if (cleanedQuery !== query) {
          const fallbackResponse = await fetch(
            `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=15`
          )
          if (fallbackResponse.ok) {
            const fallbackData = await fallbackResponse.json()
            if (fallbackData.features && Array.isArray(fallbackData.features) && fallbackData.features.length > 0) {
              const formattedSuggestions: AddressSuggestion[] = fallbackData.features.map((feature: any) => {
                // Utiliser "name" (adresse seule) au lieu de "label" (adresse + code postal + ville)
                const addressOnly = feature.properties.name || feature.properties.label?.split(/\s+\d{5}\s+/)[0] || feature.properties.label
                return {
                  label: addressOnly,
                  city: feature.properties.city,
                  postcode: feature.properties.postcode,
                  context: feature.properties.context,
                }
              })
              setSuggestions(formattedSuggestions)
            } else {
              setSuggestions([])
            }
          } else {
            setSuggestions([])
          }
        } else {
          setSuggestions([])
        }
      }
    } catch (error) {
      console.error("Erreur lors de la recherche d'adresse:", error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Si on vient juste de sélectionner une adresse, ne pas rouvrir le popover
    if (justSelectedRef.current) {
      justSelectedRef.current = false
      return
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (value && value.length >= 3) {
        searchAddress(value)
        setOpen(true)
      } else {
        setSuggestions([])
        setOpen(false)
      }
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [value])

  const handleSelect = (suggestion: AddressSuggestion, e?: React.MouseEvent) => {
    // Empêcher le comportement par défaut si un événement est fourni
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    // Marquer qu'on vient de sélectionner pour éviter que le useEffect rouvre le popover
    justSelectedRef.current = true
    // Fermer le popover immédiatement avant de mettre à jour les valeurs
    setOpen(false)
    // Vider les suggestions
    setSuggestions([])
    // Mettre à jour la valeur de l'adresse avec la suggestion sélectionnée
    onChange(suggestion.label, suggestion.postcode, suggestion.city)
    if (onPostcodeChange && suggestion.postcode) {
      onPostcodeChange(suggestion.postcode)
    }
    if (onCityChange && suggestion.city) {
      onCityChange(suggestion.city)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-black font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              id={id}
              value={value}
              onChange={(e) => {
                // Appeler onChange avec seulement la valeur de l'adresse (pas de postcode/city)
                onChange(e.target.value, undefined, undefined)
                if (e.target.value.length >= 3) {
                  setOpen(true)
                }
              }}
              onFocus={() => {
                if (value.length >= 3) {
                  setOpen(true)
                }
              }}
              placeholder="Adresse"
              required={required}
              className="pr-10 mt-1 border-gray-300 focus:border-green-500"
            />
            <ChevronsUpDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[400px] p-0" 
          align="start"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onInteractOutside={(e) => {
            // Ne pas fermer si on clique dans le popover
            const target = e.target as HTMLElement
            if (target.closest('[cmdk-input-wrapper]') || target.closest('[cmdk-item]')) {
              e.preventDefault()
            }
          }}
        >
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder="Rechercher une adresse..." 
              value={value}
              onValueChange={(searchValue) => {
                // Mettre à jour la valeur de l'input principal
                onChange(searchValue, undefined, undefined)
                if (searchValue.length >= 3) {
                  setOpen(true)
                } else {
                  setOpen(false)
                }
              }}
            />
            <CommandList>
              {isLoading ? (
                <div className="p-4 text-center text-sm text-muted-foreground">Recherche en cours...</div>
              ) : suggestions.length === 0 && value.length >= 3 ? (
                <CommandEmpty>Aucune adresse trouvée.</CommandEmpty>
              ) : suggestions.length === 0 ? (
                <CommandEmpty>Tapez au moins 3 caractères pour rechercher.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={`${suggestion.label}-${suggestion.postcode}-${index}`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleSelect(suggestion, e)
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                      }}
                      className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", value === suggestion.label ? "opacity-100" : "opacity-0")}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{suggestion.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {suggestion.postcode} {suggestion.city}
                        </span>
                      </div>
                    </div>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

