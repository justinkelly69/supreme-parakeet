'use client'

import { createContext, useEffect, useState } from 'react'
import { fetchContinents } from '@/lib/continents'
import { Continent, StyleContextType } from '@/lib/types'
import styles from './page.module.css'
import { ContinentsPage } from '@/components/countries/continents'

export const StyleContext = createContext<StyleContextType>(styles)

const Page = () => {
	//const [countries, setCountries] = useState<Country[]>([])
	const [continents, setContinents] = useState<Continent[]>([])
	const [isLoading, setIsLoading] = useState(true)

	const [style, setStyle] = useState<StyleContextType>(styles);

	useEffect(() => {
		fetchContinents(
			setIsLoading,
			setContinents,
		)
	}, [])

	return isLoading ?
		<p>Loading</p> :
		(
			<StyleContext.Provider value={style}>
				<ContinentsPage
					continents={continents}
					setContinents={setContinents}
				/>
			</StyleContext.Provider>
		)
}

export default Page