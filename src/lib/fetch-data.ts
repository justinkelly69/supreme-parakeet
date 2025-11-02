import { createClient } from '@/utils/supabase/client'
import { Continent } from './types';

const supabase = createClient()

export const fetchWorld = async () => {
    // const { data, error } = await supabase
    //     .schema('public')
    //     .from('continent_details')
    //     .select('id, name, description, longitude, latitude, zoom')
    //     .order('name', { ascending: true })

    const { data, error } = await supabase.rpc('get_world_continents')
    
    if (error) {
        console.error('Error fetching continents:', error)
        return
    }
    return (data ?? []).map((continent: Continent) => ({ ...continent }))
}

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

export const fetchCity = async (
    id: string
) => {
    const supabase = createClient()

    const { data, error } = await supabase
        .schema('public')
        .from('city_details')
        .select(`
            id,         name,       name_ascii,     country,    country_id,
            iso2,       iso3,       admin_name,     capital,    population,
            is_enabled, latitude,   longitude,      zoom,       description
        `)
        .eq('id', id)

    if (error || data.length === 0) {
        console.error('Error fetching city:', error)
        return
    }
    return { ...data[0] }
}
