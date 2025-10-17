import { createClient } from '@/utils/supabase/client'

export type City = {
    id: string,
    name: string,
    name_ascii: string,
    country: string,
    country_id: string,
    iso2: string,
    iso3: string,
    admin_name: string,
    capital: string,
    population: number,
    is_enabled: boolean,
    latitude: number,
    longitude: number,
    zoom: number,
    description: string,
}

export type CityHeader = {
    id: string,
    name_ascii: string,
    capital: string,
    population: string,
}

export const fetchCities = async (
    setIsLoading: Function,
    setCities: Function,
    country_id: string
) => {
    setIsLoading(true)

    const supabase = createClient()

    const { data, error } = await supabase
        .schema('public')
        .from('city_details')
        .select(`
            id,
            name,
            name_ascii,
            country,
            country_id,
            iso2,
            iso3,
            admin_name,
            capital,
            population,
            is_enabled,
            latitude,
            longitude,
            zoom,
            description
        `)
        .eq('country_id', country_id)

    if (error) {
        console.error('Error fetching cities:', error)
        return
    }
    else {
        setCities(data)
    }

    setIsLoading(false)
}

export const fetchCity = async (
    setIsLoading: Function,
    setCity: Function,
    id: string
) => {
    setIsLoading(true)

    const supabase = createClient()

    const { data, error } = await supabase
        .schema('public')
        .from('city_details')
        .select(`
            id,
            name,
            name_ascii,
            country,
            country_id,
            iso2,
            iso3,
            admin_name,
            capital,
            population,
            is_enabled,
            latitude,
            longitude,
            zoom,
            description
        `)
        .eq('id', id)

    if (error) {
        console.error('Error fetching city:', error)
        return
    }
    else {
        setCity({...data[0]})
    }

    setIsLoading(false)
}