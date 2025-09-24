'use client'

import { useEffect, useState } from 'react'
import { CountriesPage } from '@/components/countries/countries'
import { Continent, Country, fetchContinents, fetchCountries } from '@/lib/countries'
import styles from './page.module.css'

const Page = () => {
    const [countries, setCountries] = useState<Country[]>([])
    const [continents, setContinents] = useState<Continent[]>([])
    const [isLoading, setIsLoading] = useState(true)

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

    return isLoading ? <p>Loading</p> : (
        <CountriesPage
            countries={countries}
            setCountries={setCountries}
            continents={continents}
            setContinents={setContinents}
        />
    )
}

export default Page