
import { fetchCity } from "@/lib/fetch-data";
import { CityDetail } from "@/components/countries/city";
import { Suspense } from "react";

export default async function Page({
    params,
}: {
    params: { continent: string, country: string, city: string }
}): Promise<React.JSX.Element> {
    const { continent, country, city } = await params
    const my_city = await fetchCity(city)

    return (
        <Suspense fallback={<div>Loading city data...</div>}>
            {my_city ?
                <CityDetail city={my_city} /> :
                <div>No city data found.</div>
            }
        </Suspense>
    )
}
