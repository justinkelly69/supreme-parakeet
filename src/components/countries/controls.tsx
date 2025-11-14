"use client"

import { StyleContext } from "@/components/countries/template";
import { Button } from "@/components/ui/xbutton"
import { ChangeEventHandler, Dispatch, SetStateAction, useContext } from "react"
import { Checkbox } from "@/components/ui/xcheckboxes"
import Select from "@/components/ui/xselect"
import { Input } from "@/components/ui/xtexts";
import { SortBy, SortOrder } from "@/lib/types";
import { useRouter } from "next/navigation";

export const CityControls = (props: {
    selectCity: () => void,
    scrapeData: () => void,
    handleCancel: () => void,
}) => {
    const style = useContext(StyleContext)

    return (
        <ul className={style["top-menu-list"]}>
            <li className={style["top-menu-item"]}>
                <Button
                    onClick={_e => props.selectCity()}
                    className={style["country-edit-button"]}
                    ref={null}
                >
                    Enable
                </Button>
            </li>
            <li className={style["top-menu-item"]}>
                <Button
                    onClick={_e => props.scrapeData()}
                    className={style["country-edit-button"]}
                    ref={null}
                >
                    Save
                </Button>
            </li>
            <li className={style["top-menu-item"]}>
                <Button
                    onClick={_e => props.handleCancel()}
                    className={style["country-edit-button"]}
                    ref={null}
                >
                    Cancel
                </Button>
            </li>
        </ul>
    )
}

export const TopBarControls = (props: {
    sortBy: SortBy,
    sortOrder: SortOrder,
    showEnabled: string[],
    substring: string,
    selectedItems: string[],
    setSortBy: ChangeEventHandler<HTMLSelectElement>,
    setSortOrder: ChangeEventHandler<HTMLSelectElement>,
    setShowEnabled: Dispatch<SetStateAction<string[]>>,
    setSubstring: ChangeEventHandler<HTMLInputElement>,
    setSelectedItems: (items: string[]) => void,
    //handleSave: () => void,
    handleCancel: () => void,
}) => {
    const style = useContext(StyleContext)
    const router = useRouter()
    return (
        <ul className={style["top-menu-list"]}>
            <li className={style["top-menu-item"]}>
                <Button
                    onClick={async _e => {
                        await props.setSelectedItems(props.selectedItems)
                        router.refresh()
                    }}
                    className={style["country-edit-button"]}
                    ref={null}
                >
                    Update Selection
                </Button>
            </li>
            <li className={style["top-menu-item"]}>
                <Select
                    value={props.sortBy}
                    onChange={props.setSortBy}
                    options={[
                        { value: "name", label: "Name" },
                        { value: "population", label: "Population" },
                    ]}
                    className={style["continent-sort-select"]}
                    ref={null}
                />
            </li>
            <li className={style["top-menu-item"]}>
                <Select
                    value={props.sortOrder}
                    onChange={props.setSortOrder}
                    options={[
                        { value: "asc", label: "Ascending" },
                        { value: "desc", label: "Descending" },
                    ]}
                    className={style["continent-sort-select"]}
                    ref={null}
                />
            </li>
            <li className={style["top-menu-item"]}>
                <Checkbox
                    name="ENABLED"
                    checkedValues={props.showEnabled}
                    setCheckedValues={props.setShowEnabled}
                    showCheckbox={true}
                    className={style["continent-list"]}
                    ref={null}
                />
                <label htmlFor="ENABLED" className={style["continent-list-label"]}>Enabled</label>
                <Checkbox
                    name="DISABLED"
                    checkedValues={props.showEnabled}
                    setCheckedValues={props.setShowEnabled}
                    showCheckbox={true}
                    className={style["continent-list"]}
                    ref={null}
                />
                <label htmlFor="DISABLED" className={style["continent-list-label"]}>Disabled</label>
            </li>
            <li className={style["top-menu-item"]}>
                <Input
                    type="text"
                    id="substring"
                    name="substring"
                    placeholder="Filter countries"
                    value={props.substring}
                    onChange={props.setSubstring}
                />
            </li>
            <li className={style["top-menu-item"]}>
                <Button
                    //onClick={_e => void}
                    className={style["country-edit-button"]}
                    ref={null}
                >
                    Save
                </Button>
            </li>
            <li className={style["top-menu-item"]}>
                <Button
                    onClick={_e => props.handleCancel()}
                    className={style["country-edit-button"]}

                    ref={null}
                >
                    Cancel
                </Button>
            </li>
        </ul>
    )
}

