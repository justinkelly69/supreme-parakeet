import { AttractionDetail } from "@/components/geo/attraction"
import { fetchAttraction } from "@/lib/fetch-data"
import path from "path"
import React from "react"

export default async function Page({
    params,
}: {
    params: {
        continent: string,
        country: string,
        city: string,
        attraction: string
    }
}): Promise<React.JSX.Element> {

    const { continent, country, city, attraction } = await params
    const my_attraction = await fetchAttraction(parseInt(attraction))

    if (!my_attraction) {
        return (
            <div>Attraction not found</div>
        )
    }

    return (
        <AttractionDetail
            attraction={my_attraction!}
            path={[continent, country, city, attraction]}
        />
    )
}