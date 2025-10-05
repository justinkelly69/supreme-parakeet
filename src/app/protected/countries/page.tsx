'use client'

import { createContext, useEffect, useState, JSX } from 'react'
import { CountriesPage } from '@/components/countries/countries'
import { Continent, Country, fetchContinents, fetchCountries, StyleContextType } from '@/lib/countries'
import styles from './page.module.css'

export const StyleContext = createContext<StyleContextType>(styles)

const Page = () => {
    const [countries, setCountries] = useState<Country[]>([])
    const [continents, setContinents] = useState<Continent[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [style, setStyle] = useState<StyleContextType>(styles);

    useEffect(() => {
        fetchContinents(
            setContinents,
            setIsLoading,
        )
    }, [])

    useEffect(() => {
        fetchCountries(
            setIsLoading,
            setCountries,
        )
    }, [])

    return isLoading ?
        <p>Loading</p> :
        (
            <StyleContext.Provider value={style}>
                <CountriesPage
                    countries={countries}
                    setCountries={setCountries}
                    continents={continents}
                    setContinents={setContinents}
                />
            </StyleContext.Provider>
        )
}

export default Page