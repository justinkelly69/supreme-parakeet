import * as React from "react"
import { ChangeEventHandler, Ref } from "react"

export type CheckBoxData = {
    checked: boolean,
    name: string,
    label: string,
}

export const Checkbox = (props: {
    label: string,
    name: string,
    checked?: boolean,
    className?: string,
    labelClass?: string,
    onChange: ChangeEventHandler<HTMLInputElement>
    ref: Ref<HTMLInputElement>
}) => {
    return (
        <label className={props.labelClass}>
            <input type="checkbox"
                name={props.name}
                className={props.className}
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
    checkboxData: CheckBoxData[],
    checkedValues: string[],
    setCheckedValues: Function,
    ref: Ref<HTMLInputElement>
}) => {

    const checkedValueSet = (values: string[], checkboxes: CheckBoxData[]) => {
        const checkedValues = new Set<string>()

        const checkedNames: string[] = []
        for (const checkbox of checkboxes) {
            checkedNames.push(checkbox.name)
        }

        for (const value of values) {
            if (checkedNames.includes(value)) {
                checkedValues.add(value)
            }
        }
        return checkedValues
    }

    const checkedValueArray = (valuesSet: Set<string>) => {
        const values = []
        for (let value of valuesSet) {
            values.push(value)
        }
        values.sort()
        return values
    }

    const checkedValues = checkedValueSet(props.checkedValues, props.checkboxData)

    const checkboxes = props.checkboxData.map((option, index) => {
        return (
            <li key={index}>
                <Checkbox
                    checked={checkedValues.has(option.name)}
                    label={option.label}
                    name={option.name}
                    className={props.className}
                    labelClass={props.labelClass}
                    onChange={e => {
                        if (e.target.checked === true) {
                            checkedValues.add(option.name)
                        }
                        else {
                            checkedValues.delete(option.name)
                        }
                        props.setCheckedValues(checkedValueArray(checkedValues))
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

export const getCheckedValues = (checkBoxData: CheckBoxData[]) => {
    const values: string[] = []

    for (const value of checkBoxData) {
        if (value.checked) {
            values.push(value.name)
        }
    }
    return values
}

export const setCheckedValues = (checkBoxData: CheckBoxData[], values: string[]) => {
    const dataOut: CheckBoxData[] = []

    for (const dataItem of checkBoxData) {
        dataOut.push({
            name: dataItem.name,
            label: dataItem.label,
            checked: values.includes(dataItem.name),
        })
    }
    return dataOut
}
