import { StyleContext } from "@/components/countries/template";

import { Button } from "@/components/ui/xbutton"
import { ChangeEventHandler, useContext } from "react"
import { CheckboxGroup } from "@/components/ui/xcheckboxes"
import Select from "@/components/ui/xselect"
import { Input } from "@/components/ui/xtexts";

export const CityControls = (props: {
    handleEdit: Function,
    handleSave: Function,
    handleCancel: Function,
}) => {
    const style = useContext(StyleContext)

    return (
        <ul className={style["top-menu-list"]}>
            <li className={style["top-menu-item"]}>
                <Button
                    onClick={e => props.handleEdit()}
                    className={style["country-edit-button"]}
                    children={"Enable"}
                    ref={null}
                />
            </li>
            <li className={style["top-menu-item"]}>
                <Button
                    onClick={e => props.handleSave()}
                    className={style["country-edit-button"]}
                    children="Save"
                    ref={null}
                />
            </li>
            <li className={style["top-menu-item"]}>
                <Button
                    onClick={e => props.handleCancel()}
                    className={style["country-edit-button"]}
                    children="Cancel"
                    ref={null}
                />
            </li>
        </ul>
    )
}

export const ContinentControls = (props: {
    sortBy: "name" | "population",
    setSortBy: ChangeEventHandler<HTMLSelectElement>,
    sortOrder: "asc" | "desc",
    setSortOrder: ChangeEventHandler<HTMLSelectElement>,
    showEnabled: string[],
    setShowEnabled: ChangeEventHandler<HTMLInputElement>,
    substring: string,
    setSubstring: ChangeEventHandler<HTMLInputElement>,
    handleSave: Function,
    handleCancel: Function,
}) => {
    const style = useContext(StyleContext)

    return (
        <ul className={style["top-menu-list"]}>
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
                <CheckboxGroup
                    label="Select Countries"
                    className={style["continent-list"]}
                    labelClass={style["continent-list-label"]}
                    boxClass={style["continent-list-box"]}
                    listItemClass={style["continent-list-item"]}
                    checkedValues={props.showEnabled}
                    setCheckedValues={props.setShowEnabled}
                    showCheckboxes={true} 
                    checkboxData={[
                        { name: "ENABLED", label: "Enabled", checked: true },
                        { name: "DISABLED", label: "Disabled", checked: true },
                    ]}
                    ref={null}
                />
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
                    onClick={e => props.handleSave()}
                    className={style["country-edit-button"]}
                    children="Save"
                    ref={null}
                />
            </li>
            <li className={style["top-menu-item"]}>
                <Button
                    onClick={e => props.handleCancel()}
                    className={style["country-edit-button"]}
                    children="Cancel"
                    ref={null}
                />
            </li>
        </ul>
    )
}

export const CountryControls = (props: {
    sortBy: "name" | "population",
    setSortBy: ChangeEventHandler<HTMLSelectElement>,
    sortOrder: "asc" | "desc",
    setSortOrder: ChangeEventHandler<HTMLSelectElement>,
    showEnabled: string[],
    setShowEnabled: ChangeEventHandler<HTMLInputElement>,
    substring: string,
    setSubstring: ChangeEventHandler<HTMLInputElement>,
    handleEdit: Function,
    handleSave: Function,
    handleCancel: Function,
}) => {
    const style = useContext(StyleContext)

    console.log('showEnabled:', props.showEnabled)

    return (
        <ul className={style["top-menu-list"]}>
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
                <CheckboxGroup
                    label="Select Countries"
                    className={style["continent-list"]}
                    labelClass={style["continent-list-label"]}
                    boxClass={style["continent-list-box"]}
                    listItemClass={style["continent-list-item"]}
                    checkedValues={props.showEnabled}
                    setCheckedValues={props.setShowEnabled}
                    showCheckboxes={true} 
                    checkboxData={[
                        { name: "ENABLED", label: "Enabled" },
                        { name: "DISABLED", label: "Disabled" },
                    ]}
                    ref={null}
                />
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
                    onClick={e => props.handleEdit()}
                    className={style["country-edit-button"]}
                    children={"Enable"}
                    ref={null}
                />
            </li>
            <li className={style["top-menu-item"]}>
                <Button
                    onClick={e => props.handleSave()}
                    className={style["country-edit-button"]}
                    children="Save"
                    ref={null}
                />
            </li>
            <li className={style["top-menu-item"]}>
                <Button
                    onClick={e => props.handleCancel()}
                    className={style["country-edit-button"]}
                    children="Cancel"
                    ref={null}
                />
            </li>
        </ul>
    )
}


