import React, { Suspense } from 'react'

import { PageTemplate } from '@/components/world/templates'
import WorldDetail from '@/components/world/world'
import CountryDetail from '@/components/world/country'
import CityDetail from '@/components/world/city'
import ContinentDetail from '@/components/world/continent'
import { fetchCity, fetchContinent, fetchContinentsWithCountries, fetchCountry, fetchWorld } from '@/lib/fetch-data'

export default async function Page({
	params,
}: {
	params: {
		slug: string
	}
}) {
	const { slug } = await params;
	const path = slug ? Array.isArray(slug) ? slug : [slug] : [];

	console.log('slug:', slug)
	console.log('path:', path)

	switch (path.length) {

		case 1: {
			const country = await fetchCountry(path[0])

			if (!country) {
				return (
					<div>Country not found</div>
				)
			}

			return (
				<PageTemplate crumbs={path}>
					<CountryDetail
						country={country}
					/>
				</PageTemplate>
			)
			break
		}
		// case 2: {

		// }
		// case 3:
		// 	const city = fetchCity(path[2])
		// 	content = <CityDetail cityName={path[2]} />
		// 	break

		default: {
			const continentsWithCountries = await fetchContinentsWithCountries()
			return (
				<PageTemplate crumbs={path}>
					<WorldDetail
						continentsWithCountries={continentsWithCountries}
					/>
				</PageTemplate>
			)
		}
	}
}