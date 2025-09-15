'use client'

import { useEffect, useState } from 'react'
import { CountriesPage } from '@/components/countries'
import { Continent, Country, getContinents, getCountries } from '@/lib/countries'
import { CheckBoxData } from '@/components/ui/xcheckbox'

export default function Page() {
    const [countries, setCountries] = useState<Country[]>([])
    const [continents, setContinents] = useState<Continent[]>([])

    useEffect(() => {
        getCountries(setCountries)
        getContinents(setContinents)
    }, [])

    return (
        <CountriesPage
            countries={countries}
            setCountries={setCountries}
            continents={continents}
            setContinents={setContinents}
        />
    )
}

    // countries: Country[],
    // setCountries: Function,
    // continentData: CheckBoxData[],
    // continents: string[]