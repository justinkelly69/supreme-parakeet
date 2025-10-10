"use client"

import React, { use, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Country, fetchCountry } from "@/lib/countries";
import { City, fetchCities, fetchCity } from "@/lib/cities";
import { CountryDetail } from "@/components/countries/countries";
import { CityDetail } from "@/components/countries/cities";

const MyCity = ({
    params,
}: {
    params: Promise<{ id: string }>
}): React.JSX.Element | "Loading..." | null => {

    const [city, setCity] = useState<City>()
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()
    const { id } = use(params)

    useEffect(() => {
        fetchCity(
            setIsLoading,
            setCity,
            id,
        ) 
    },[])

    return (
        city ?
            isLoading ? 'Loading...' :
                <CityDetail
                    city={city}
                />
            : null
    )
}

export default MyCity