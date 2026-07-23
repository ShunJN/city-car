"use client"

import React, { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NationalitySuggestion {
  nom: string
  code: string
}

// Liste des nationalités principales
const nationalities = [
  "Française",
  "Allemande",
  "Italienne",
  "Espagnole",
  "Belge",
  "Suisse",
  "Luxembourgeoise",
  "Néerlandaise",
  "Portugaise",
  "Britannique",
  "Irlandaise",
  "Polonaise",
  "Roumaine",
  "Bulgare",
  "Tchèque",
  "Hongroise",
  "Slovaque",
  "Slovène",
  "Croate",
  "Grecque",
  "Autrichienne",
  "Suédoise",
  "Danoise",
  "Finlandaise",
  "Norvégienne",
  "Russe",
  "Ukrainienne",
  "Turque",
  "Marocaine",
  "Algérienne",
  "Tunisienne",
  "Sénégalaise",
  "Ivoirienne",
  "Malgache",
  "Camerounaise",
  "Congolaise",
  "Béninoise",
  "Burkinabé",
  "Guinéenne",
  "Mauritanienne",
  "Nigerienne",
  "Tchadienne",
  "Centrafricaine",
  "Gabonaise",
  "Togolaise",
  "Américaine",
  "Canadienne",
  "Mexicaine",
  "Brésilienne",
  "Argentine",
  "Chilienne",
  "Colombienne",
  "Péruvienne",
  "Vénézuélienne",
  "Chinoise",
  "Japonaise",
  "Coréenne",
  "Indienne",
  "Pakistanaise",
  "Bangladeshi",
  "Vietnamienne",
  "Thaïlandaise",
  "Indonésienne",
  "Philippine",
  "Malaisienne",
  "Singapourienne",
  "Australienne",
  "Néo-zélandaise",
  "Sud-africaine",
  "Égyptienne",
  "Israélienne",
  "Libanaise",
  "Jordannienne",
  "Saoudienne",
  "Émiratie",
  "Qatarie",
  "Koweïtienne",
  "Bahreïnienne",
  "Omanaise",
  "Yéménite",
  "Irakienne",
  "Iranienne",
  "Afghane",
  "Pakistanaise",
].sort()

interface NationalityAutocompleteProps {
  value: string
  onChange: (value: string) => void
  label?: string
  required?: boolean
  id?: string
}

export function NationalityAutocomplete({
  value,
  onChange,
  label = "Nationalité",
  required = false,
  id = "nationalite",
}: NationalityAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<NationalitySuggestion[]>([])
  const debounceRef = useRef<NodeJS.Timeout>()

  const searchNationality = (query: string) => {
    if (query.length < 1) {
      setSuggestions(
        nationalities.slice(0, 20).map((nat) => ({ nom: nat, code: nat }))
      )
      return
    }

    const queryLower = query.toLowerCase().trim()
    const filtered = nationalities
      .filter((nat) => nat.toLowerCase().includes(queryLower))
      .slice(0, 20)
      .map((nat) => ({ nom: nat, code: nat }))

    setSuggestions(filtered)
  }

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      searchNationality(value)
      if (value.length >= 1) {
        setOpen(true)
      }
    }, 200)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [value])

  const handleSelect = (suggestion: NationalitySuggestion) => {
    onChange(suggestion.nom)
    setTimeout(() => {
      setOpen(false)
    }, 100)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && "*"}
      </Label>
      <Popover open={open} onOpenChange={(isOpen) => {
        if (isOpen || value.length >= 1) {
          setOpen(isOpen)
        }
      }}>
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
                if (value.length >= 0) {
                  setOpen(true)
                }
              }}
              placeholder="Nationalité"
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
            const target = e.target as HTMLElement
            if (target.closest('[cmdk-input-wrapper]') || target.closest('[cmdk-item]')) {
              e.preventDefault()
            }
          }}
        >
          <Command shouldFilter={false}>
            <CommandInput 
              placeholder="Rechercher une nationalité..." 
              value={value}
              onValueChange={(searchValue) => {
                onChange(searchValue)
                if (searchValue.length >= 1) {
                  setOpen(true)
                }
              }}
            />
            <CommandList>
              {suggestions.length === 0 ? (
                <CommandEmpty>Aucune nationalité trouvée.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {suggestions.map((suggestion, index) => (
                    <CommandItem
                      key={index}
                      value={suggestion.nom}
                      onSelect={() => handleSelect(suggestion)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", value === suggestion.nom ? "opacity-100" : "opacity-0")}
                      />
                      <span className="font-medium">{suggestion.nom}</span>
                    </CommandItem>
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








