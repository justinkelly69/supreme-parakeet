import { ApifyClient } from 'apify-client';
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export const fetchAttractions = async ({
    locationQuery,
    searchStringArray,
}: {
    locationQuery: string,
    searchStringArray: string[],
}) => {

    const client = new ApifyClient({
        token: process.env.NEXT_PUBLIC_APIFY_TOKEN,
    })

    const actorRun = await client.actor('compass/crawler-google-places').call({
        queries: {
            "allPlacesNoSearchAction": "all_places_no_search_ocr",
            "includeWebResults": false,
            "language": "en",
            "locationQuery": locationQuery,
            "maxCrawledPlacesPerSearch": 100,
            "maxImages": 10,
            "maximumLeadsEnrichmentRecords": 10,
            "scrapeContacts": false,
            "scrapeDirectories": false,
            "scrapeImageAuthors": false,
            "scrapePlaceDetailPage": false,
            "scrapeReviewsPersonalData": true,
            "scrapeTableReservationProvider": false,
            "searchStringsArray": searchStringArray,
            "skipClosedPlaces": false
        }
    })

    const { items } = await client.dataset(actorRun.defaultDatasetId).listItems();
    console.log(JSON.stringify(items, null, 4))

    return items
}

type OpeningHour = {
    "day": string,
    "hours": string
}

type AdditionalInfo = {
    [name: string]: AdditionalInfoItem[]
}

type AdditionalInfoItem = {
    [name: string]: boolean
}

type Attraction = {
    title: string,
    subTitle: string,
    description?: string,
    price?: number,
    categoryName?: string,
    address?: string,
    neighborhood?: string,
    street?: string,
    city?: string,
    postalCode?: string,
    state?: string,
    countryCode?: string,
    website?: string,
    phone?: string,
    phoneUnformatted?: string,
    claimThisBusiness?: boolean,
    location?: {
        lat: number,
        lng: number
    },
    totalScore?: number,
    permanentlyClosed?: boolean,
    temporarilyClosed?: boolean,
    placeId?: string,
    categories?: string[],
    fid?: string,
    cid?: string,
    reviewsCount?: number,
    imageCategories?: string[],
    scrapedAt?: string,
    googleFoodUrl?: string,
    hotelAds?: string[],
    openingHours?: OpeningHour[],
    peopleAlsoSearch?: string[],
    placesTags?: string[],
    reviewsTags?: string[],
    additionalInfo?: AdditionalInfo,
    gasPrices?: string[],
    url?: string,
    searchPageUrl?: string,
    searchString?: string,
    language?: string,
    rank?: number,
    isAdvertisement?: false,
    kgmid?: string
}

// "additionalInfo": {
//       "Service options": [
//         {
//           "Onsite services": true
//         }
//       ],
//       "Highlights": [
//         {
//           "Picnics": true
//         }
//       ],

const processAttraction = ({
    attraction
}:{
    attraction: AdditionalInfo
}) => {
    const out :{
        [name: string]:string[]
    } = {}

    for (const key1 of Object.keys(attraction)) {
        const k1 = escapeApos(key1)
        const k2:string[] = []

        




        out[k1] = k2

    }

    return out
}

const escapeApos = (str: string) => {
    return str.split(/'/).join('&apos;')
}

const escapeArray = (arr: string[]) => {
    let out:string[] = []

    for(const s of arr) {
        out.push(escapeApos(s))
    }
    return out
}

const processAdditionalInfo = () => {

}

// sub info {
//     my ($arr1) = @_;
//     my %out;

//     foreach my $key1 (keys %$arr1) {
//         my $k1 = escape_quot($key1);
//         $out{$k1} = [];
//         my $arr2 = $arr1->{$key1};

//         for (my $i = 0; $i < @$arr2; $i++) {
//             foreach my $key3 (keys %{$$arr2[$i]}) {
//                 my $k3 = escape_quot($key3);
//                 push(@{$out{$k1}}, $k3);
//             }
//         }
//     }

//     return \%out;
// }

/* const { error } = await supabase
    .schema('world')
    .from('attractions')
    .insert([
        { id: 1, name: 'Mordor' },
        { id: 1, name: 'The Shire' },
    ]) */
