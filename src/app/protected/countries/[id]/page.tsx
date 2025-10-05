"use client"

import React, { use, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Country, fetchCountry } from "@/lib/countries";
import { City, fetchCities } from "@/lib/cities";
import { CountryDetail } from "@/components/countries/countries";

const MyCountry = ({
    params,
}: {
    params: Promise<{ id: string }>
}): React.JSX.Element | "Loading..." | null => {

    const [country, setCountry] = useState<Country>()
    const [cities, setCities] = useState<City[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()
    const { id } = use(params)

    useEffect(() => {
        fetchCountry(
            setIsLoading,
            setCountry,
            id,
        ) 
        // fetchCities(
        //     setIsLoading,
        //     setCities,
        //     id,
        // )

    },[])

    // useEffect(() => {
    //     fetchCities(
    //         setIsLoading,
    //         setCities,
    //         id,
    //     )
    // }, [])

    return (
        country ?
            isLoading ? 'Loading...' :
                <CountryDetail
                    country={country}
                    setCountry={setCountry}
                    cities={cities}
                />
            : null
    )
}

export default MyCountry