'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, Locale } from '@/translations'

interface LanguageContextType {
    locale: Locale
    t: typeof translations['en']
    setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>('ko') // Default to Korean as per recent interaction

    const value = {
        locale,
        t: translations[locale],
        setLocale
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
