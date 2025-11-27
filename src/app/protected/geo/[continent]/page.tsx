
import { ContinentDetail } from '@/components/geo/continent'
import { fetchContinent } from '@/lib/fetch-data'
import { Suspense } from 'react'

export default async function Page({
	params,
}: {
	params: { 
		continent: string 
	}
}): Promise<React.JSX.Element> {
	const { continent } = await params
	const my_continent = await fetchContinent(continent)

	if (!my_continent) {
		return (
			<div>Continent not found</div>
		)
	}

	return (
		<Suspense fallback={<div>Loading world data...</div>}>
			<ContinentDetail
				path={[continent]}
				continent={my_continent}
			/>
		</Suspense>
	)
}