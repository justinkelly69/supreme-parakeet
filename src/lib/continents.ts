import { CheckBoxData } from '@/components/ui/xcheckboxes';
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export type StyleContextType = { [key: string]: string; }

export type Continent = {
    id: string,
    name: string,
}

export type ContinentCountries = {
    id: string,
    name: string,
}

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
    else {
        //console.log("no error continents", JSON.stringify(data, null, 4))
    }

    setContinents((data ?? []).map((continent: Continent) => ({
        id: continent.id,
        name: continent.name,
    })))

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




