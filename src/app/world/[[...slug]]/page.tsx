"use client"

import React, { Suspense } from 'react'
import { useParams } from 'next/navigation'
import { PageTemplate } from '@/components/world/templates'
import WorldDetail from '@/components/world/world'
import CountryDetail from '@/components/world/country'
import CityDetail from '@/components/world/city'
import ContinentDetail from '@/components/world/continent'
import { fetchCity, fetchContinent, fetchCountry, fetchWorld } from '@/lib/fetch-data'

export default function Page() {

	const params = useParams()
	const slug = params?.slug || []

	if (typeof slug === 'undefined' || typeof slug === 'string') {
		return (
			<div>This is 404</div>
		)
	}

	let content: React.JSX.Element;

	switch (slug.length) {

		case 1:
			const countries = fetchContinent(slug[0])
			content = <ContinentDetail continentName={slug[0]} />
			break

		case 2:
			const country = fetchCountry(slug[1])
			content = <CountryDetail countryCode={slug[1]} />
			break

		case 3:
			const city = fetchCity(slug[2])
			content = <CityDetail cityName={slug[2]} />
			break

		default:
			const continents = fetchWorld()
			content = <WorldDetail />
	}


	return (
		<PageTemplate
			latitude={0}
			longitude={0}
			zoom={1}
			crumbs={slug}
		>
			{content}
		</PageTemplate>
	)
}