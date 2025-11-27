
import { fetchWorld } from '@/lib/fetch-data'
import { WorldDetail } from '@/components/geo/world'
import { Suspense } from 'react'

export default async function Page() {
	const continents = await fetchWorld()

	return (
		<Suspense fallback={<div>Loading world data...</div>}>
			{continents ?
				<WorldDetail continents={continents} /> :
				<div>No continent data found.</div>
			}
		</Suspense>
	)
}
