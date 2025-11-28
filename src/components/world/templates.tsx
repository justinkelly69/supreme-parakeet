import { createContext, ReactElement, useContext, useState } from "react";

import Map from "@/components/world/map";
import Breadcrumbs from "@/components/world/breadcrumbs";
import Controls from "./controls";
import Footer from "./footer";
import { FlexBox, FlexCell } from "../ui/xflex";
import styles from '@/components/world/page.module.css';
import { StyleContextType } from "@/lib/types";

export const StyleContext = createContext<StyleContextType>(styles);

export const PageTemplate = (props: {
    latitude: number,
    longitude: number,
    zoom: number,
    crumbs: string[],
    children?: ReactElement | ReactElement[] | string | null,
}) => {
    const [longitude, setLongitude] = useState(props.longitude);
    const [latitude, setLatitude] = useState(props.latitude);
    const [zoom, setZoom] = useState(1);

    const style = useContext(StyleContext)

    return (
        <FlexBox
            flexDirection={"column"}
            flexWrap="nowrap"
            alignItems={"stretch"}
            justifyContent={"flex-start"}
            className={style["container"]}
            height={"100vh"}
        >
            <FlexCell
                flex="10 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["container-map"]}
            >
                <Map
                    longitude={longitude}
                    latitude={latitude}
                    zoom={zoom}
                    setLongitude={setLongitude}
                    setLatitude={setLatitude}
                    setZoom={setZoom}
                />
            </FlexCell>

            <FlexCell
                flex="1 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["container-breadcrumbs"]}
            >
                <Breadcrumbs crumbs={props.crumbs} />
            </FlexCell>

            <FlexCell
                flex="1 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["container-controls"]}
            >
                <Controls />
            </FlexCell>

            <FlexCell
                flex="20 0 auto"
                overflowX="hidden"
                overflowY="hidden"
                tagName="main"
                className={style["container-content"]}
            >
                <>{props.children}</>
            </FlexCell>

            <FlexCell
                flex="6 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["container-footer"]}
            >
                <>Copyright &copy; SnapTrip.io</>
            </FlexCell>
        </FlexBox >
    )
}