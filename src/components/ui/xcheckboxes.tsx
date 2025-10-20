import * as React from "react"
import { ChangeEventHandler, Ref } from "react"

export type CheckBoxData = {
    checked?: boolean,
    name: string,
    label: string,
}

export const Checkbox = (props: {
    label: string,
    name: string,
    checked: boolean,
    boxClass?: string,
    labelClass?: string,
    onChange: ChangeEventHandler<HTMLInputElement>
    ref: Ref<HTMLInputElement>
}) => {
    return (
        <label className={props.labelClass}>
            <input type="checkbox"
                name={props.name}
                className={props.boxClass}
                defaultChecked={props.checked}
                onChange={props.onChange}
                ref={props.ref}
            />
            {props.label}
        </label>
    )
}

export const CheckboxGroup = (props: {
    label: string,
    className?: string,
    labelClass?: string,
    boxClass?: string,
    listItemClass?: string,
    checkboxData: CheckBoxData[],
    checkedValues: string[],
    setCheckedValues: Function,
    ref: Ref<HTMLInputElement>
}) => {

    const checkboxes = props.checkboxData.map((option, index) => {
        return (
            <li key={index}
                className={props.listItemClass}
            >
                <Checkbox
                    checked={props.checkedValues.includes(option.name)}
                    label={option.label}
                    name={option.name}
                    boxClass={props.boxClass}
                    labelClass={props.labelClass}
                    onChange={e => {
                        if (e.target.checked === true) {
                            props.setCheckedValues([...props.checkedValues, option.name])
                        }
                        else {
                            props.setCheckedValues(props.checkedValues.filter(e => e !== option.name))
                        }
                    }}
                    ref={props.ref}
                />
            </li>
        )
    })

    return (
        <ul className={props.className}>
            {checkboxes}
        </ul>
    )
}


