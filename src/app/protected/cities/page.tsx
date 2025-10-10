'use client'

import { createContext, useEffect, useState, JSX } from 'react'
import { CountriesPage } from '@/components/countries/countries'
import { Country, fetchCountries, StyleContextType } from '@/lib/countries'
import styles from './page.module.css'
import { City, fetchCities } from '@/lib/cities'

export const StyleContext = createContext<StyleContextType>(styles)

const Page = () => {
    const [cities, setCities] = useState<City[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [style, setStyle] = useState<StyleContextType>(styles);

    /* useEffect(() => {
        fetchCities(
            setCities,
            setIsLoading,
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
        ) */
}

export default Page