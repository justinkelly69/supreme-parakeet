"use client"

import React, { use, useEffect, useState } from "react";
import { fetchCity } from "@/lib/cities";
import { CityDetail } from "@/components/countries/cities";
import { City } from "@/lib/types";

const MyCity = ({
    params,
}: {
    params: Promise<{ continent: string, country: string, city: string }>
}): React.JSX.Element | "Loading..." | null => {

    const [my_city, setCity] = useState<City>()
    const [isLoading, setIsLoading] = useState(true)

    const { continent, country, city } = use(params)

    useEffect(() => {
        fetchCity(
            setIsLoading,
            setCity,
            city,
        )
    }, [])

    return (
        my_city ?
            isLoading ? 'Loading...' :
                <CityDetail
                    city={my_city}
                />
            : null
    )
}

export default MyCity