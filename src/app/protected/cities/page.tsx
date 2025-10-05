'use client'

import { createContext, useEffect, useState, JSX } from 'react'
import { CountriesPage } from '@/components/countries/countries'
import { Continent, Country, fetchContinents, fetchCountries, StyleContextType } from '@/lib/countries'
//import styles from './page.module.css'

//export const StyleContext = createContext<StyleContextType>(styles)