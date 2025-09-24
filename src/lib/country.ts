import { CheckBoxData } from '@/components/ui/xcheckboxes';
import { createClient } from '@/utils/supabase/client'
import { Country } from './countries';

const supabase = createClient()

export const fetchCountry = async (
    setIsLoading: Function,
    setCountry: Function,
    id: number,
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
        `).eq('id', id)

    if (error) {
        console.error('Error fetching countries:', error)
        return
    }

    setCountry((data:Country) => ({
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
    }))

    setIsLoading(false)
}
