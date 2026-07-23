"use client"

import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  label?: string
  required?: boolean
  id?: string
}

export function PhoneInput({
  value,
  onChange,
  label = "Téléphone",
  required = false,
  id = "telephone",
}: PhoneInputProps) {
  const formatPhoneNumber = (input: string): string => {
    // Supprimer tous les caractères non numériques
    const numbers = input.replace(/\D/g, "")
    
    // Limiter à 10 chiffres pour un numéro français
    const limitedNumbers = numbers.slice(0, 10)
    
    // Formater avec des espaces : XX XX XX XX XX
    if (limitedNumbers.length <= 2) {
      return limitedNumbers
    } else if (limitedNumbers.length <= 4) {
      return `${limitedNumbers.slice(0, 2)} ${limitedNumbers.slice(2)}`
    } else if (limitedNumbers.length <= 6) {
      return `${limitedNumbers.slice(0, 2)} ${limitedNumbers.slice(2, 4)} ${limitedNumbers.slice(4)}`
    } else if (limitedNumbers.length <= 8) {
      return `${limitedNumbers.slice(0, 2)} ${limitedNumbers.slice(2, 4)} ${limitedNumbers.slice(4, 6)} ${limitedNumbers.slice(6)}`
    } else {
      return `${limitedNumbers.slice(0, 2)} ${limitedNumbers.slice(2, 4)} ${limitedNumbers.slice(4, 6)} ${limitedNumbers.slice(6, 8)} ${limitedNumbers.slice(8)}`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    onChange(formatted)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-black font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type="tel"
        value={value}
        onChange={handleChange}
        placeholder="06 12 34 56 78"
        required={required}
        maxLength={14} // 10 chiffres + 4 espaces
        className="mt-1 border-gray-300 focus:border-green-500"
      />
    </div>
  )
}

