'use client'

import { useEffect, useState } from 'react'
import { CountriesPage } from '@/components/countries'
import { Country, getCountries } from '@/lib/countries'

export default function Page() {
    const [countries, setCountries] = useState<Country[]>([])

    useEffect(() => {
        getCountries(setCountries)
    }, [])

    return (
        <CountriesPage
            countries={countries}
            setCountries={setCountries}
        />
    )
}