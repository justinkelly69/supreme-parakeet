"use client";

import { ContinentWithCountries, SortBy, SortOrder } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { getMap } from "./map";
import { DetailsTemplate, PageTemplate, SideMenu } from "./template";
import { TextArea } from "../ui/xtexts";
import { StyleContext } from "@/components/countries/template";
import { getSelectedItems, sortCountries } from "@/lib/utils";
import { setEnabledCountries } from "@/lib/countries";
import { TopBarControls } from "./controls";


export const ContinentDetail = (props: {
    continent: ContinentWithCountries,
}) => {
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const style = useContext(StyleContext)
    const router = useRouter()

    const [showEnabled, setShowEnabled] = useState<string[]>(["ENABLED", "DISABLED"])
    const [substring, setSubstring] = useState("")
    const [sortBy, setSortBy] = useState<"name" | "population">("name")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
    const [selectedCountries, setSelectedCountries] = useState<string[]>(
        getSelectedItems(props.continent.countries)
    )

    useEffect(() => {
        if (map.current) return;

        map.current = getMap(
            mapContainer,
            map,
            props.continent.longitude,
            props.continent.latitude,
            props.continent.zoom,
        ) || null
    }, []);

    return (
        <main className="main">
            <PageTemplate
                className="country"
                title={
                    <h1 className={style['page-title']}>
                        {props.continent.name}
                    </h1>
                }
                flag={
                    <div className={style["country-flag-position"]}>
                        🇺🇳
                    </div>
                }
                controls={
                    <TopBarControls
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        showEnabled={showEnabled}
                        substring={substring}
                        selectedItems={selectedCountries}
                        setSortBy={e => setSortBy(e.target.value as SortBy)}
                        setSortOrder={e => setSortOrder(e.target.value as SortOrder)}
                        setShowEnabled={setShowEnabled}
                        setSubstring={e => setSubstring(e.target.value)}
                        setSelectedItems={setEnabledCountries}
                        handleSave={(e: any) => e}
                        handleCancel={router.back}
                    />
                }
                leftArea={
                    <SideMenu
                        showCheckboxes={showEnabled.includes("ENABLED") && showEnabled.includes("DISABLED")}
                        child_id={props.continent.id}
                        items={sortCountries({
                            items: props.continent.countries,
                            sortBy: sortBy,
                            sortOrder: sortOrder,
                            showEnabled: showEnabled
                        })}
                        selectedItems={selectedCountries}
                        setSelectedItems={setSelectedCountries}
                        substring={substring}
                        selectionURL='[continent]/[country]'
                        selectionPath={[props.continent.id]}
                    />
                }
                mapArea={
                    <div
                        style={{ height: '100%', width: '100%' }}
                        ref={mapContainer}
                        className={style["map-container"]}
                    />
                }
                descriptionArea={
                    <TextArea
                        id="country_description"
                        name="country_description"
                        value=""
                        placeholder="Description"
                        rows={10}
                        cols={30}
                        className={style["country-description"]}
                        ref={null}
                    />
                }
                rightArea={
                    <DetailsTemplate rows={[
                    ]} />
                }
            />
        </main>
    )
}

