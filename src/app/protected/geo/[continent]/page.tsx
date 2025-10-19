
import { ContinentDetail } from '@/components/countries/continent'
import { fetchContinent } from '@/lib/fetch-data'
import { Suspense } from 'react'

export default async function Page({
	params,
}: {
	params: { continent: string }
}): Promise<React.JSX.Element> {
	const { continent } = await params
	const my_continent = await fetchContinent(continent)

	return (
		<Suspense fallback={<div>Loading world data...</div>}>
			<ContinentDetail
				continent={my_continent}
			/>
		</Suspense>
	)
}