'use client'

import React, { useContext, ReactElement } from "react";
//import { StyleContext } from "@/app/protected/geo/page";
import { GridContainer, GridArea, em, emTotal } from "../ui/xgrid";
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
                gridRowStart={1}
                gridRowEnd={2}
                gridColumnStart={1}
                gridColumnEnd={3}
                className={style['country-heading']}
            >
                {props.title}
            </GridArea>
            <GridArea
                gridRowStart={1}
                gridRowEnd={2}
                gridColumnStart={3}
                gridColumnEnd={4}
                className={style['country-flag']}
            >
                {props.flag}
            </GridArea>
            <GridArea
                gridRowStart={2}
                gridRowEnd={3}
                gridColumnStart={1}
                gridColumnEnd={4}
                className={style['country-cell-header']}
            >
                {props.controls}
            </GridArea>
            <GridArea
                gridRowStart={3}
                gridRowEnd={5}
                gridColumnStart={1}
                gridColumnEnd={2}
                className={style['country-details']}
            >
                {props.leftArea}
            </GridArea>
            <GridArea
                gridRowStart={3}
                gridRowEnd={4}
                gridColumnStart={2}
                gridColumnEnd={3}
                className={style['country-map']}
            >
                {props.mapArea}
            </GridArea>
            <GridArea
                gridRowStart={4}
                gridRowEnd={5}
                gridColumnStart={2}
                gridColumnEnd={3}
                className={style['country-details']}
            >
                {props.descriptionArea}
            </GridArea>
            <GridArea
                gridRowStart={3}
                gridRowEnd={5}
                gridColumnStart={3}
                gridColumnEnd={4}
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

const getSelectionValues = (item_ids: string[], item_id:string):string => {
    return `${item_ids.join('/')}/${item_id}`
}

export const SideMenu = (props: {
    showCheckboxes: boolean,
    child_id: string,
    flag?: string,
    items: ContinentCountryCity[],
    selectedItems: string[],
    setSelectedItems: Function,
    substring: string,
    selectionURL: string,
    selectionPath: string[],
}) => {
    const style = useContext(StyleContext)
    const columnWidths = [16]
    const rowHeight = 1.6
    const totalRows = 33

    const cityList = props.items?.filter(
        e => e.name.toLowerCase()
            .includes(props.substring.toLowerCase()))
        .map(
            (item, index) =>
                <div key={index}>
                    <span>{props.flag ? props.flag : item.flag}</span>
                    <Checkbox
                        key={item.id}
                        name={item.id}
                        checkedValues={props.selectedItems}
                        setCheckedValues={props.setSelectedItems}
                        showCheckbox={props.showCheckboxes}
                        className={'continent-list'}
                        ref={null}
                    />
                    <Link key={index}
                        href={`/protected/geo/${props.selectionURL}`}
                        as={`/protected/geo/${getSelectionValues(props.selectionPath, item.id)}`}
                        className={'list-item'}
                    >
                        {item.name}
                    </Link>

                </div>
        )
    return (
        <ListTemplate
            columnWidths={columnWidths}
            rowHeight={rowHeight}
            totalRows={totalRows}
            listItems={cityList}
            listItemClass={style['props.listItemClass']}
        />
    )
}