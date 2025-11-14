
import { fetchCity } from "@/lib/fetch-data";
import { CityDetail } from "@/components/countries/city";
import { Suspense } from "react";

export default async function Page({
    params,
}: {
    params: { continent: string, country: string, city: string }
}): Promise<React.JSX.Element> {
    const { city } = await params
    const my_city = await fetchCity(city)

    if (!my_city) {
        return (
            <div>City not found</div>
        )
    }

    return (
        <Suspense fallback={<div>Loading city data...</div>}>
            <CityDetail city={my_city} />
        </Suspense>
    )
}
