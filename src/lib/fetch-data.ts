import { createClient } from '@/utils/supabase/client'
import { Continent } from './types';

const supabase = createClient()

//-------------------------------------------------------------------------------
//-- fetchWorld
//-------------------------------------------------------------------------------
export const fetchWorld = async () => {
    const { data, error } = await supabase.rpc('get_world_continents')

    if (error) {
        console.error('Error fetching continents:', error)
        return
    }
    return (data ?? []).map((continent: Continent) => ({ ...continent }))
}

//-------------------------------------------------------------------------------
//-- fetchContinent
//-------------------------------------------------------------------------------
export const fetchContinent = async (
    continent: string,
) => {
    const { data, error } = await supabase.rpc(
        'get_continent_with_countries', { 'continent_id': continent }
    )
    if (error) {
        console.error('Error fetching continent:', error)
        return
    }
    return { ...data }
}

//-------------------------------------------------------------------------------
//-- fetchCountry
//-------------------------------------------------------------------------------
export const fetchCountry = async (
    id: string,
) => {
    const { data, error } = await supabase.rpc(
        'get_country_with_cities', { 'country_id': id }
    )
    if (error) {
        console.error('Error fetching countries:', error)
        return
    }
    return { ...data, id }
}

//-------------------------------------------------------------------------------
//-- fetchCity
//-------------------------------------------------------------------------------
export const fetchCity = async (
    id: string
) => {
    const { data, error } = await supabase.rpc(
        'get_city_with_attractions', { 'city_id': id }
    ) 

    if (error || data.length === 0) {
        console.error('Error fetching city:', error)
        return
    }
    return { ...data, id }
}
//-------------------------------------------------------------------------------
//-- fetchAttraction
//-------------------------------------------------------------------------------
export const fetchAttraction = async (
    id: number
) => {
    const { data, error } = await supabase.rpc(
        'get_attraction', { 'attraction_id': id }
    ) 

    if (error || data.length === 0) {
        console.error('Error fetching attraction:', error)
        return
    }
    return { ...data, id }
}

//-------------------------------------------------------------------------------
//-- setEnabledCountries
//-------------------------------------------------------------------------------
export const setEnabledCountries = async (countryIds: string[]) => {
    try {
        await supabase.rpc('set_enabled_countries', {
            enabled_countries: countryIds
        })
    }
    catch (err) {
        console.error('Failed to set enabled countries:', err)
    }
}

//-------------------------------------------------------------------------------
//-- setEnabledCities
//-------------------------------------------------------------------------------
export const setEnabledCities = async (cityIds: string[]) => {
    try {
        await supabase.rpc('set_enabled_cities', {
            enabled_cities: cityIds
        })
    }
    catch (err) {
        console.error('Failed to set enabled cities:', err)
    }
}
