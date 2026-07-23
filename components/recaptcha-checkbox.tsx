"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, RotateCcw } from "lucide-react"

interface RecaptchaCheckboxProps {
  onVerificationChange: (isVerified: boolean) => void
  className?: string
}

export function RecaptchaCheckbox({ onVerificationChange, className = "" }: RecaptchaCheckboxProps) {
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleClick = async () => {
    if (isVerified) return

    setIsChecked(true)
    setIsLoading(true)
    setShowError(false)

    // Simulate verification process (2-3 seconds)
    setTimeout(
      () => {
        const success = Math.random() > 0.1 // 90% success rate

        if (success) {
          setIsVerified(true)
          setIsLoading(false)
          onVerificationChange(true)
        } else {
          setIsLoading(false)
          setIsChecked(false)
          setShowError(true)
          onVerificationChange(false)

          // Hide error after 2 seconds
          setTimeout(() => setShowError(false), 2000)
        }
      },
      2000 + Math.random() * 1000,
    ) // 2-3 seconds
  }

  const resetCaptcha = () => {
    setIsChecked(false)
    setIsLoading(false)
    setIsVerified(false)
    setShowError(false)
    onVerificationChange(false)
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div
        className={`
          relative w-6 h-6 border-2 rounded cursor-pointer transition-all duration-200
          ${
            isVerified
              ? "bg-green-500 border-green-500"
              : showError
                ? "border-red-500 bg-red-50"
                : "border-gray-300 hover:border-blue-400 bg-white"
          }
        `}
        onClick={handleClick}
      >
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
              />
            </motion.div>
          )}

          {isVerified && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            </motion.div>
          )}

          {showError && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <RotateCcw className="w-3 h-3 text-red-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${showError ? "text-red-600" : "text-gray-700"}`}>
            {showError ? "Échec de la vérification" : "Je ne suis pas un robot"}
          </span>

          {showError && (
            <button onClick={resetCaptcha} className="text-xs text-blue-600 hover:text-blue-800 underline">
              Réessayer
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2 mt-1">
          <div className="flex space-x-1">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
            />
            <div className="w-4 h-4 rounded-full bg-gray-300" />
          </div>
          <span className="text-xs text-gray-500">reCAPTCHA</span>
          <div className="text-xs text-gray-400">Confidentialité - Conditions</div>
        </div>
      </div>
    </div>
  )
}
