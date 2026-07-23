"use client"

import React, { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface BirthplaceSuggestion {
  nom: string
  codePostal?: string
}

// Liste des arrondissements de Paris
const parisArrondissements = [
  "Paris 1er arrondissement",
  "Paris 2e arrondissement",
  "Paris 3e arrondissement",
  "Paris 4e arrondissement",
  "Paris 5e arrondissement",
  "Paris 6e arrondissement",
  "Paris 7e arrondissement",
  "Paris 8e arrondissement",
  "Paris 9e arrondissement",
  "Paris 10e arrondissement",
  "Paris 11e arrondissement",
  "Paris 12e arrondissement",
  "Paris 13e arrondissement",
  "Paris 14e arrondissement",
  "Paris 15e arrondissement",
  "Paris 16e arrondissement",
  "Paris 17e arrondissement",
  "Paris 18e arrondissement",
  "Paris 19e arrondissement",
  "Paris 20e arrondissement",
]

interface BirthplaceAutocompleteProps {
  value: string
  onChange: (value: string) => void
  label?: string
  required?: boolean
  id?: string
}

export function BirthplaceAutocomplete({
  value,
  onChange,
  label = "Lieu de naissance",
  required = false,
  id = "lieuNaissance",
}: BirthplaceAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<BirthplaceSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout>()
  const justSelectedRef = useRef(false)

  const searchBirthplace = async (query: string) => {
    if (query.length < 1) {
      setSuggestions([])
      return
    }

    const queryLower = query.toLowerCase().trim()

    // Vérifier si l'utilisateur tape exactement "paris" ou commence par "paris "
    // Ne pas intercepter "pantin", "pau", "parisien", etc.
    if (queryLower === "paris" || queryLower === "pari" || queryLower === "par" || queryLower === "pa" || queryLower === "p") {
      // Si c'est juste "p", "pa", "par", "pari" ou "paris", montrer les arrondissements
      const filtered = queryLower.length <= 2 
        ? parisArrondissements
        : parisArrondissements.filter((arr) => arr.toLowerCase().includes(queryLower))
      
      setSuggestions(filtered.map((arr) => ({ nom: arr })))
      setIsLoading(false)
      return
    }
    
    // Si ça commence par "paris " (avec un espace ou autre chose après), c'est probablement Paris
    if (queryLower.startsWith("paris ") || queryLower.startsWith("paris-")) {
      const filtered = parisArrondissements.filter((arr) => arr.toLowerCase().includes(queryLower))
      setSuggestions(filtered.map((arr) => ({ nom: arr })))
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    try {
      // Utilisation de l'API GéoAPI du gouvernement français pour les villes
      // Augmenter la limite et ne pas utiliser boost=population pour avoir TOUTES les villes
      const response = await fetch(
        `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&limit=20`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()

      if (Array.isArray(data) && data.length > 0) {
        const formattedSuggestions: BirthplaceSuggestion[] = data.map((commune: any) => ({
          nom: commune.nom,
          codePostal: commune.codesPostaux?.[0] || "",
        }))
        setSuggestions(formattedSuggestions)
      } else {
        setSuggestions([])
      }
    } catch (error) {
      console.error("Erreur lors de la recherche de lieu de naissance:", error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Si on vient juste de sélectionner un lieu de naissance, ne pas rouvrir le popover
    if (justSelectedRef.current) {
      justSelectedRef.current = false
      return
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (value && value.length >= 1) {
        searchBirthplace(value)
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

  const handleSelect = (suggestion: BirthplaceSuggestion, e?: React.MouseEvent) => {
    // Empêcher le comportement par défaut si un événement est fourni
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    // Marquer qu'on vient de sélectionner pour éviter que le useEffect rouvre le popover
    justSelectedRef.current = true
    // Fermer le popover immédiatement avant de mettre à jour la valeur
    setOpen(false)
    // Vider les suggestions
    setSuggestions([])
    // Mettre à jour la valeur du lieu de naissance avec la suggestion sélectionnée
    onChange(suggestion.nom)
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
              placeholder="Lieu de naissance"
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
              placeholder="Rechercher un lieu de naissance..." 
              value={value}
              onValueChange={(searchValue) => {
                onChange(searchValue)
                if (searchValue.length >= 1) {
                  setOpen(true)
                }
              }}
            />
            <CommandList>
              {isLoading ? (
                <div className="p-4 text-center text-sm text-muted-foreground">Recherche en cours...</div>
              ) : suggestions.length === 0 && value.length >= 2 ? (
                <CommandEmpty>Aucun lieu trouvé.</CommandEmpty>
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
                      <span className="font-medium">{suggestion.nom}</span>
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

