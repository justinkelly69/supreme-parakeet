import { CheckBoxData } from '@/components/ui/xcheckboxes';
import { createClient } from '@/utils/supabase/client'
import { Continent } from './types';

const supabase = createClient()

export const fetchContinents = async (
    setIsLoading: Function,
    setContinents: Function,
) => {
    setIsLoading(true)

    const { data, error } = await supabase
        .schema('public')
        .from('continent_details')
        .select('id, name, description, longitude, latitude, zoom')
        .order('name', { ascending: true })

    if (error) {
        console.error('Error fetching continents:', error)
        return
    }
    else {
        setContinents((data ?? []).map((continent: Continent) => ({ ...continent })))
    }

    setIsLoading(false)
}

export const fetchContinent = async (
    setIsLoading: Function,
    setContinent: Function,
    continent: string,
) => {
    setIsLoading(true)

    const { data, error } = await supabase
        .schema('public')
        .from('continent_details')
        .select('id, name, description, longitude, latitude, zoom')
        .eq('id', continent)

    if (error) {
        console.error('Error fetching continents:', error)
        setIsLoading(false)
        return
    }
    else {
        setContinent({ ...data[0] })
    }

    setIsLoading(false)
}




