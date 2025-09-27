import { CheckBoxData } from '@/components/ui/xcheckboxes';
import { createClient } from '@/utils/supabase/client'

export type StyleContextType = { [key: string]: string; }

export type Country = {
    id: string,
    continent_id: string,
    continent_name: string,
    name: string,
    flag: string,
    tld: string,
    prefix: string,
    is_eu: boolean,
    is_enabled: boolean,
    was_enabled: boolean,
    description: string,
    latitude: number,
    longitude: number,
    zoom: number,
};

export type EnabledCountry = {
    id: string,
    is_enabled: boolean,
}

export type Continent = {
    id: string,
    name: string,
}

const supabase = createClient()

export const fetchContinents = async (
    setContinents: Function,
    setIsLoading: Function
) => {
    setIsLoading(true)

    const { data, error } = await supabase
        .schema('iso')
        .from('continents')
        .select('id, name')

    if (error) {
        console.error('Error fetching continents:', error)
        return
    }

    setContinents((data ?? []).map((continent: Continent) => ({
        id: continent.id,
        name: continent.name,
    })))

    setIsLoading(false)
}

export const fetchCountries = async (
    setIsLoading: Function,
    setCountries: Function,
) => {
    setIsLoading(true)

    const { data, error } = await supabase.from('country_details').select(`
            id, 
            continent_id, 
            continent_name, 
            name, 
            flag, 
            tld, 
            prefix, 
            is_eu, 
            is_enabled, 
            description, 
            longitude, 
            latitude, 
            zoom
        `)

    if (error) {
        console.error('Error fetching countries:', error)
        return
    }

    setCountries(
        (data ?? []).map((item: any) => ({
            id: item.id,
            continent_id: item.continent_id,
            continent_name: item.continent_name,
            name: item.name,
            flag: item.flag,
            tld: item.tld,
            prefix: item.prefix,
            is_eu: item.is_eu,
            is_enabled: item.is_enabled,
            was_enabled: item.is_enabled,
            description: item.description,
            longitude: item.longitude,
            latitude: item.latitude,
            zoom: item.zoom,
        }))
    )

    setIsLoading(false)
}

export const fetchCountry = async (
    setIsLoading: Function,
    setCountry: Function,
    id: string,
) => {
    setIsLoading(true)

    const { data, error } = await supabase.from('country_details').select(`
            continent_id, 
            continent_name, 
            name, 
            flag, 
            tld, 
            prefix, 
            is_eu, 
            is_enabled, 
            description, 
            longitude, 
            latitude, 
            zoom
        `).eq('id', id).single()

    if (error) {
        console.error('Error fetching countries:', error)
        return
    }

    //console.log('data', JSON.stringify(data, null, 4))

    setCountry({
            id: id,
            continent_id: data.continent_id,
            continent_name: data.continent_name,
            name: data.name,
            flag: data.flag,
            tld: data.tld,
            prefix: data.prefix,
            is_eu: data.is_eu,
            is_enabled: data.is_enabled,
            was_enabled: data.is_enabled,
            description: data.description,
            longitude: data.longitude,
            latitude: data.latitude,
            zoom: data.zoom,
    })

    setIsLoading(false)
}


export const setContinentData = (continents: Continent[]) => {
    const out: CheckBoxData[] = []

    for (const continent of continents) {
        out.push({
            name: continent.id,
            label: continent.name,
            checked: true,
        })
    }
    return out
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
    selectedContinentIDs: string[],
    countries: Country[],
    showEnabled: string,
): Country[] => {
    let selectedCountries: Country[] = []

    for (const continentId of selectedContinentIDs) {
        const countriesByContinent = countries.filter((e => e.continent_id === continentId))

        for (const co of countriesByContinent) {
            selectedCountries.push(co)
        }

        if (showEnabled === 'ENABLED') {
            selectedCountries = selectedCountries.filter((e => e.is_enabled === true))
        }

        else if (showEnabled === 'DISABLED') {
            selectedCountries = selectedCountries.filter((e => e.is_enabled === false))
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