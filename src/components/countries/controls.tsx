import { StyleContext } from "@/app/protected/geo/page";
import { Button } from "../ui/xbutton"
import { useContext } from "react"
import { CheckBoxData, CheckboxGroup } from "../ui/xcheckboxes"
import Select, { OptionArgs } from "../ui/xselect"

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

export const CountryControls = (props: {
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
    showEnabled: string[],
    setShowEnabled: Function,
    selectedContinent: string,
    setSelectedContinent: Function,
    continentArgs: OptionArgs[]
}) => {
    const style = useContext(StyleContext)

    const enabledArgs: CheckBoxData[] = [
        { name: "ENABLED", label: "Enabled", checked: true },
        { name: "DISABLED", label: "Disabled", checked: true },
    ]

    return (
        <>
            <CheckboxGroup
                label="Select Countries"
                className={style["continent-list"]}
                labelClass={style["continent-list-label"]}
                boxClass={style["continent-list-box"]}
                listItemClass={style["continent-list-item"]}
                checkedValues={props.showEnabled}
                setCheckedValues={(e: string[]) => {
                    props.setShowEnabled(e)
                }}
                checkboxData={enabledArgs}
                ref={null}
            />
            <Select className={`${style["select-continents-dropdown"]}`}
                value={props.selectedContinent}
                onChange={(e) => props.setSelectedContinent(e.target.value)}
                options={props.continentArgs}
                ref={null}
            />
        </>
    )
}