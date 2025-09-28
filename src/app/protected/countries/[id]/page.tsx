"use client"

import React, { use, useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import { Country, fetchCountry } from "@/lib/countries";
import { Button } from "@/components/ui/xbutton";
import { TextArea } from "@/components/ui/xtexts";
import { GridContainer, GridItem, em } from "@/components/ui/xgrid";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import { StyleContext } from "@/app/protected/countries/page";
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

    const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoianVzdGlua2VsbHk2OSIsImEiOiJjbWZ1NjRxd20wcWMwMmpxemd2NDhnaWhsIn0.lxbyz7IFID7MAHADJ1k2yg'

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