import { createClient } from '@/utils/supabase/client'
import { Country, EnabledCountry } from './types';

const supabase = createClient()



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