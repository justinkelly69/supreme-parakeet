'use client'

import React, { useContext, ReactElement } from "react";
import { GridContainer, GridArea } from "../ui/xgrid";
import { em, emTotal } from "@/lib/utils";
import { FlexBox, FlexCell } from "../ui/xflex";
import { ContinentCountryCity, StyleContextType } from "@/lib/types";
import styles from '@/app/protected/geo/page.module.css'
import { Checkbox } from "../ui/xcheckboxes";
import Link from "next/link";

export const StyleContext = React.createContext<StyleContextType>(styles);

export const PageTemplate = (props: {
    className: string,
    title: ReactElement,
    flag: ReactElement,
    controls: ReactElement,
    leftArea: ReactElement,
    mapArea: ReactElement,
    descriptionArea: ReactElement,
    rightArea: ReactElement,
}) => {

    const style = useContext(StyleContext)
    const colWidths = em([20, 50, 20])
    const rowHeights = em([4, 1.6, 30, 20])

    return (
        <GridContainer
            cols={colWidths}
            rows={rowHeights}
            justifyContent="center"
            alignItems="center"
            gap="0"
            className="country"
        >
            <GridArea
                gridArea="1/1/2/3"
                className={style['country-heading']}
            >
                {props.title}
            </GridArea>
            <GridArea
                gridArea="1/3/2/4"
                className={style['country-flag']}
            >
                {props.flag}
            </GridArea>
            <GridArea
                gridArea="2/1/3/4"
                className={style['country-cell-header']}
            >
                {props.controls}
            </GridArea>
            <GridArea
                gridArea="3/1/5/2"
                className={style['country-details']}
            >
                {props.leftArea}
            </GridArea>
            <GridArea
                gridArea="3/2/4/3"
                className={style['country-map']}
            >
                {props.mapArea}
            </GridArea>
            <GridArea
                gridArea="4/2/5/3"
                className={style['country-details']}
            >
                {props.descriptionArea}
            </GridArea>
            <GridArea
                gridArea="3/3/5/4"
                className={style['country-details']}
            >
                {props.rightArea}
            </GridArea>
        </GridContainer>
    )

}

export const ListTemplate = (props: {
    columnWidths: number[],
    rowHeight: number,
    totalRows: number,
    listItems: ReactElement[],
    listItemClass: string,
}) => {
    const style = useContext(StyleContext)

    const colWidths = em(props.columnWidths)
    const rowheight = `${props.rowHeight}em`
    const totalHeight = `${props.totalRows * props.rowHeight}em`
    const totalWidth = emTotal(props.columnWidths)

    return (
        <FlexBox
            flexDirection='column'
            alignItems='stretch'
            justifyContent='flex-start'
            height={totalHeight}
        >
            <FlexCell
                flex=' 0 1 auto'
                overflowX='hidden'
                overflowY='scroll'
            >
                <GridContainer
                    cols={colWidths}
                    rows={`repeat(${props.totalRows}, ${rowheight})`}
                    justifyContent='center'
                    gap="0"
                >
                    {props.listItems}
                </GridContainer>
            </FlexCell>
        </FlexBox>
    );
}

export type RowType = string | number | boolean

export const DetailsTemplate = (props: {
    rows: [string, RowType][]
}) => {
    const style = useContext(StyleContext)
    const rows = props.rows.map((row, index) => {
        return (
            <DetailsTemplateRow
                key={index}
                label={row[0]}
                value={row[1]}
            />
        )
    })
    return (
        <div className={style["details-table"]}>
            {rows}
        </div>
    )
}

export const DetailsTemplateRow = (props: {
    label: string,
    value: RowType,
}) => {
    const style = useContext(StyleContext)
    return (
        <>
            <div className={style["details-label"]}>
                {props.label}:
            </div>
            <div className={style["details-data"]}>
                {props.value}
            </div>
        </>
    )
}

export const getListItemUrl = (item_ids: string[], item_id: string): string => {
    return [...item_ids, item_id].join('/')
}

