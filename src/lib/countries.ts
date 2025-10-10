import { CheckBoxData } from '@/components/ui/xcheckboxes';
import { createClient } from '@/utils/supabase/client'

export type StyleContextType = { [key: string]: string; }

export type Continent = {
    id: string,
    name: string,
}

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
    iso2: string,
    demonym: string,
    population: number,
    density: number,
    area: number,
    gdp: number,
    median_age: number,
    website: string,
    driving_side: string,
    un_member: boolean,
    religion: string,
    cities: [{
        id: string,
        name: string,
        capital: string,
    }]
};

export type CountryCities = {
    id: string,
    name: string,
    capital: string,
}

export type EnabledCountry = {
    id: string,
    is_enabled: boolean,
}
const supabase = createClient()

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
            zoom,
            iso2,
            demonym,
            population,
            density,
            area,
            gdp,
            median_age,
            website,
            driving_side,
            un_member,
            religion
        `)

    if (error) {
        console.error('Error fetching countries:', error)
        return
    }

    //console.log('data', JSON.stringify(data, null, 4))

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
            iso2: item.iso2,
            demonym: item.demonym,
            population: item.population,
            density: item.density,
            area: item.area,
            gdp: item.gdp,
            median_age: item.median_age,
            website: item.website,
            driving_side: item.driving_side,
            un_member: item.un_member,
            religion: item.religion
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

    // const { data, error } = await supabase.from('country_details').select(`
    //         continent_id, 
    //         continent_name, 
    //         name, 
    //         flag, 
    //         tld, 
    //         prefix, 
    //         is_eu, 
    //         is_enabled, 
    //         description, 
    //         longitude, 
    //         latitude, 
    //         zoom,
    //         iso2,
    //         demonym,
    //         population,
    //         density,
    //         area,
    //         gdp,
    //         median_age,
    //         website,
    //         driving_side,
    //         un_member,
    //         religion
    //     `).eq('id', id).single()

    const { data, error } = await supabase.rpc('get_country_with_cities', { 'country_id': id })

    if (error) {
        console.error('Error fetching countries:', error)
        return
    }
    else {
        console.log("no error", JSON.stringify(data, null, 4))
    }

    setCountry({ ...data, id })

    // setCountry({
    //     id: id,
    //     continent_id: data.continent_id,
    //     continent_name: data.continent_name,
    //     name: data.name,
    //     flag: data.flag,
    //     tld: data.tld,
    //     prefix: data.prefix,
    //     is_eu: data.is_eu,
    //     is_enabled: data.is_enabled,
    //     was_enabled: data.is_enabled,
    //     description: data.description,
    //     longitude: data.longitude,
    //     latitude: data.latitude,
    //     zoom: data.zoom,
    //     iso2: data.iso2,
    //     demonym: data.demonym,
    //     population: data.population,
    //     density: data.density,
    //     area: data.area,
    //     gdp: data.gdp,
    //     median_age: data.median_age,
    //     website: data.website,
    //     driving_side: data.driving_side,
    //     un_member: data.un_member,
    //     religion: data.religion,
    // })

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