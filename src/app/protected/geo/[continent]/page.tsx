
import { ContinentDetail } from '@/components/countries/continent'
import { fetchContinent } from '@/lib/fetch-data'
import { Suspense } from 'react'

export default async function Page({
	params,
}: {
	params: { continent: string }
}): Promise<React.JSX.Element> {
	const { continent } = await params
	const continentWithCountries = await fetchContinent(continent)

	return (
		<Suspense fallback={<div>Loading world data...</div>}>
			{continentWithCountries ?
				<ContinentDetail
					continentWithCountries={continentWithCountries}
				/> :
				<div>No continent data found.</div>
			}
		</Suspense>
	)
}