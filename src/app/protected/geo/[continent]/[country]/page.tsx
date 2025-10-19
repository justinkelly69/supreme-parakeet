
import { fetchCountry } from "@/lib/fetch-data";
import { CountryDetail } from "@/components/countries/country";
import { Suspense } from "react";

export default async function Page({
    params,
}: {
    params: { continent: string, country: string }
}): Promise<React.JSX.Element> {
    const { continent, country } = await params
    const my_country = await fetchCountry(country)

    return (
        <Suspense fallback={<div>Loading country data...</div>}>
            {my_country ?
                <CountryDetail country={my_country} /> :
                <div>No country data found.</div>
            }
        </Suspense>
    )
}
