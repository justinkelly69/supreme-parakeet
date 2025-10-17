"use client"

import React, { use, useEffect, useState } from "react";
import { fetchCountry } from "@/lib/countries";
import { Country, City } from "@/lib/types";
import { CountryDetail } from "@/components/countries/countries";

const MyCountry = ({
    params,
}: {
    params: Promise<{ country: string }>
}): React.JSX.Element | "Loading..." | null => {

    const [my_country, setCountry] = useState<Country>()
    const [cities, setCities] = useState<City[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const { country } = use(params)

    useEffect(() => {
        fetchCountry(
            setIsLoading,
            setCountry,
            country,
        ) 
    },[])

    return (
        my_country ?
            isLoading ? 'Loading...' :
                <CountryDetail
                    country={my_country}
                    setCountry={setCountry}
                    cities={cities}
                />
            : null
    )
}

export default MyCountry