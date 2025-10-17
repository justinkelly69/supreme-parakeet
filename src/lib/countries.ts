import { createClient } from '@/utils/supabase/client'
import { Country, EnabledCountry } from './types';

const supabase = createClient()

export const fetchCountries = async (
    setIsLoading: Function,
    setCountries: Function,
) => {
    setIsLoading(true)
    
    const { data, error } = await supabase.from('country_details').select(`
            id,         continent_id,   continent_name, name,       flag, 
            tld,        prefix,         is_eu,          is_enabled, description, 
            longitude,  latitude,       zoom,           iso2,       demonym,
            population, density,        area,           gdp,        median_age,
            website,    driving_side,   un_member,      religion
    `)
    if (error) {
        console.error('Error fetching countries:', error)
        setIsLoading(false)
        return
    }
    else {
        setCountries((data ?? []).map((item: any) => ({...item})))
    }

    setIsLoading(false)
}

export const fetchCountry = async (
    setIsLoading: Function,
    setCountry: Function,
    id: string,
) => {
    setIsLoading(true)

    const { data, error } = await supabase.rpc('get_country_with_cities', { 'country_id': id })
    if (error) {
        console.error('Error fetching countries:', error)
        setIsLoading(false)
        return
    }
    else {
        setCountry({ ...data, id })
    }

    setIsLoading(false)
}


export const updateSelectedCountries = async (countries: Country[]) => {
    try {
        await supabase.rpc('update_selected_countries', {
            selected_countries: getEnabledCountries(countries)
        })
    }
    catch (err) {
        console.error('Failed to update countries:', err)
    }
}

// Filter out the countries that have changed
export const getEnabledCountries = (countries: Country[]): EnabledCountry[] => {
    const out: EnabledCountry[] = []

    for (let i = 0; i < countries.length; i++) {
        const c = countries[i]
        if (c.is_enabled !== c.was_enabled) {
            out.push({
                id: c.id,
                is_enabled: c.was_enabled
            })
        }
    }
    return out
}

// Get selected countries and filter by enabled
export const filterSelectedCountries = (
    selectedContinentID: string,
    countries: Country[],
    showEnabled: string[],
): Country[] => {
    let selectedCountries: Country[] = []
    const countriesByContinent = countries.filter((e => e.continent_id === selectedContinentID))

    for (const co of countriesByContinent) {
        if (showEnabled.includes('ENABLED') && co.is_enabled === true) {
            selectedCountries.push(co)
        }
        else if (showEnabled.includes('DISABLED') && co.is_enabled === false) {
            selectedCountries.push(co)
        }
    }
    return selectedCountries
}

// update selected country 
export const selectCountry = (
    countries: Country[],
    country: Country,
    checked: boolean
): Country[] => {
    const co: Country[] = []

    for (let i = 0; i < countries.length; i++) {
        const c = countries[i]
        let wasEnabled = c.was_enabled

        if (countries[i].id === country.id) {
            wasEnabled = checked
        }

        co.push({
            ...c,
            was_enabled: wasEnabled,
        })
    }
    return co
}