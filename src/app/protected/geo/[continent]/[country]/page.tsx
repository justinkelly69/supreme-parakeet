
import { fetchCountry } from "@/lib/fetch-data";
import { CountryDetail } from "@/components/countries/country";
import { Suspense } from "react";

export default async function Page({
    params,
}: {
    params: { continent: string, country: string }
}): Promise<React.JSX.Element> {
    const { country } = await params
    const my_country = await fetchCountry(country)

    if (!my_country) {
        return (
            <div>Country not found</div>
        )
    }

    return (
        <Suspense fallback={<div>Loading country data...</div>}>
            <CountryDetail country={my_country} />
        </Suspense>
    )
}
