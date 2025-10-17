'use client'

import { use, useEffect, useState } from 'react'
import { fetchContinent } from '@/lib/continents'
import { Continent, Country, StyleContextType } from '@/lib/types'
import styles from '../page.module.css'
import { CountriesPage } from '@/components/countries/countries'
import { fetchCountries } from '@/lib/countries'
import { StyleContext } from '../page'

//export const StyleContext = createContext<StyleContextType>(styles)

const Page = ({
	params,
}: {
	params: Promise<{ continent: string }>
}): React.JSX.Element | "Loading..." | null => {

	const [my_continent, setContinent] = useState<Continent>()
	const [countries, setCountries] = useState<Country[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const [style, setStyle] = useState<StyleContextType>(styles);

	const { continent } = use(params)

	useEffect(() => {
		fetchContinent(
			setIsLoading,
			setContinent,
			continent
		)
	}, [])

	useEffect(() => {
		fetchCountries(
			setIsLoading,
			setCountries,
			continent
		)
	}, [])

	return isLoading ?
		<p>Loading</p> :
		(
			<StyleContext.Provider value={style}>
				<CountriesPage
					continent={my_continent}
					countries={countries}
					setCountries={setCountries}
				/>
			</StyleContext.Provider>
		)
}

export default Page