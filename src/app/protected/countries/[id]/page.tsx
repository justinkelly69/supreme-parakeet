"use client"

import React, { use, useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Country, fetchCountry } from "@/lib/countries";
import { CountryDetail } from "@/components/countries/countries";

const MyCountry = ({
    params,
}: {
    params: Promise<{ id: string }>
}): React.JSX.Element | "Loading..." | null => {

    const [country, setCountry] = useState<Country>()
    const [isLoading, setIsLoading] = useState(true)

    const router = useRouter()
    const { id } = use(params)

    useEffect(() => {
        fetchCountry(
            setIsLoading,
            setCountry,
            id,
        )
    }, [])

    return (
        country ?
            isLoading ? 'Loading...' :
                <CountryDetail
                    country={country}
                    setCountry={setCountry}
                />
            : null
    )
}

export default MyCountry