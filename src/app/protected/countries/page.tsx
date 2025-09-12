'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { Country, CountriesPage, getCountries } from '@/components/countries'

export default function Page() {
    const [countries, setCountries] = useState<Country[]>([])
    const supabase = createClient()

    useEffect(() => {
        getCountries(setCountries)
    }, [])

    //console.log('countries 0', JSON.stringify(countries, null, 4))
    return (
        <CountriesPage
            countries={countries}
            setCountries={setCountries}
        />
    )
}