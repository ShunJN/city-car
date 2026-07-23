"use client"

import React, { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface CitySuggestion {
  nom: string
  codePostal: string
  codeCommune: string
}

interface CityAutocompleteProps {
  value: string
  onChange: (city: string, postcode?: string) => void
  onPostcodeChange?: (postcode: string) => void
  label?: string
  required?: boolean
  id?: string
}

// Liste des arrondissements de Paris
const parisArrondissements = [
  { nom: "Paris 1er arrondissement", codePostal: "75001" },
  { nom: "Paris 2e arrondissement", codePostal: "75002" },
  { nom: "Paris 3e arrondissement", codePostal: "75003" },
  { nom: "Paris 4e arrondissement", codePostal: "75004" },
  { nom: "Paris 5e arrondissement", codePostal: "75005" },
  { nom: "Paris 6e arrondissement", codePostal: "75006" },
  { nom: "Paris 7e arrondissement", codePostal: "75007" },
  { nom: "Paris 8e arrondissement", codePostal: "75008" },
  { nom: "Paris 9e arrondissement", codePostal: "75009" },
  { nom: "Paris 10e arrondissement", codePostal: "75010" },
  { nom: "Paris 11e arrondissement", codePostal: "75011" },
  { nom: "Paris 12e arrondissement", codePostal: "75012" },
  { nom: "Paris 13e arrondissement", codePostal: "75013" },
  { nom: "Paris 14e arrondissement", codePostal: "75014" },
  { nom: "Paris 15e arrondissement", codePostal: "75015" },
  { nom: "Paris 16e arrondissement", codePostal: "75016" },
  { nom: "Paris 17e arrondissement", codePostal: "75017" },
  { nom: "Paris 18e arrondissement", codePostal: "75018" },
  { nom: "Paris 19e arrondissement", codePostal: "75019" },
  { nom: "Paris 20e arrondissement", codePostal: "75020" },
]

export function CityAutocomplete({
  value,
  onChange,
  onPostcodeChange,
  label = "Ville",
  required = false,
  id = "ville",
}: CityAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout>()
  const justSelectedRef = useRef(false)

  const searchCity = async (query: string) => {
    if (query.length < 1) {
      setSuggestions([])
      return
    }

    // Vérifier si l'utilisateur tape exactement "paris" ou commence par "paris "
    // Ne pas intercepter "pantin", "pau", "parisien", etc.
    const queryLower = query.toLowerCase().trim()
    if (queryLower === "paris" || queryLower === "pari" || queryLower === "par" || queryLower === "pa" || queryLower === "p") {
      // Si c'est juste "p", "pa", "par", "pari" ou "paris", montrer les arrondissements
      const filtered = queryLower.length <= 2 
        ? parisArrondissements
        : parisArrondissements.filter((arr) => arr.nom.toLowerCase().includes(queryLower))
      
      setSuggestions(
        filtered.map((arr) => ({
          nom: arr.nom,
          codePostal: arr.codePostal,
          codeCommune: arr.codePostal,
        }))
      )
      setIsLoading(false)
      return
    }
    
    // Si ça commence par "paris " (avec un espace ou autre chose après), c'est probablement Paris
    if (queryLower.startsWith("paris ") || queryLower.startsWith("paris-")) {
      const filtered = parisArrondissements.filter((arr) => arr.nom.toLowerCase().includes(queryLower))
      setSuggestions(
        filtered.map((arr) => ({
          nom: arr.nom,
          codePostal: arr.codePostal,
          codeCommune: arr.codePostal,
        }))
      )
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      // Utilisation de l'API GéoAPI du gouvernement français
      // Augmenter la limite et ne pas utiliser boost=population pour avoir TOUTES les villes
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&limit=20`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()

      if (Array.isArray(data) && data.length > 0) {
        const formattedSuggestions: CitySuggestion[] = data.map((commune: any) => ({
          nom: commune.nom,
          codePostal: commune.codesPostaux?.[0] || "",
          codeCommune: commune.code,
        }))
        setSuggestions(formattedSuggestions)
      } else {
        setSuggestions([])
      }
    } catch (error) {
      console.error("Erreur lors de la recherche de ville:", error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Si on vient juste de sélectionner une ville, ne pas rouvrir le popover
    if (justSelectedRef.current) {
      justSelectedRef.current = false
      return
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (value && value.length >= 1) {
        searchCity(value)
        if (value.length >= 1) {
          setOpen(true)
        }
      } else {
        setSuggestions([])
        setOpen(false)
      }
    }, 200)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [value])

  const handleSelect = (suggestion: CitySuggestion, e?: React.MouseEvent) => {
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
    // Mettre à jour la valeur de la ville avec la suggestion sélectionnée
    onChange(suggestion.nom, suggestion.codePostal)
    if (onPostcodeChange && suggestion.codePostal) {
      onPostcodeChange(suggestion.codePostal)
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && "*"}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              id={id}
              value={value}
              onChange={(e) => {
                onChange(e.target.value)
                if (e.target.value.length >= 1) {
                  setOpen(true)
                }
              }}
              onFocus={() => {
                if (value.length >= 1) {
                  setOpen(true)
                }
              }}
              placeholder="Ville"
              required={required}
              className="pr-10"
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
              placeholder="Rechercher une ville..." 
              value={value}
              onValueChange={(searchValue) => {
                // Ne pas mettre à jour si on vient juste de sélectionner
                if (!justSelectedRef.current) {
                  onChange(searchValue)
                  if (searchValue.length >= 1) {
                    setOpen(true)
                  }
                }
              }}
            />
            <CommandList>
              {isLoading ? (
                <div className="p-4 text-center text-sm text-muted-foreground">Recherche en cours...</div>
              ) : suggestions.length === 0 && value.length >= 2 ? (
                <CommandEmpty>Aucune ville trouvée.</CommandEmpty>
              ) : suggestions.length === 0 ? (
                <CommandEmpty>Tapez au moins 2 caractères pour rechercher.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
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
                        className={cn("mr-2 h-4 w-4", value === suggestion.nom ? "opacity-100" : "opacity-0")}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{suggestion.nom}</span>
                        {suggestion.codePostal && (
                          <span className="text-xs text-muted-foreground">Code postal: {suggestion.codePostal}</span>
                        )}
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

