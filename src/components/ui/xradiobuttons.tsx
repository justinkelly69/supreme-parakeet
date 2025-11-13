import * as React from "react"
import { ChangeEventHandler, Ref } from "react"

export type RadioButtonData = {
    value: string,
    label: string,
}

export const RadioButton = (props: {
    label: string,
    name: string,
    value: string | number,
    checked?: boolean,
    className?: string,
    labelClass?: string,
    onChange: ChangeEventHandler<HTMLInputElement>
    ref: Ref<HTMLInputElement>
}) => {
    return (
        <label className={props.labelClass}>
            <input type="radio"
                name={props.name}
                value={props.value}
                className={props.className}
                defaultChecked={props.checked}
                onChange={props.onChange}
                ref={props.ref}
            />
            {props.label}
        </label>
    )
}

export const RadioButtons = (props: {
    label: string,
    name: string,
    className?: string,
    labelClass?: string,
    radioButtonsData: RadioButtonData[],
    checkedValue: string,
    setCheckedValue: (val: string) => void,
    ref: Ref<HTMLInputElement>

}) => {
    const radiobuttons = props.radioButtonsData.map((option, index) => {
        return (
            <li key={index}>
                <RadioButton
                    checked={props.checkedValue === option.value}
                    label={option.label}
                    name={props.name}
                    value={option.value}
                    className={props.className}
                    labelClass={props.labelClass}
                    onChange={e => {
                        if (e.target.checked === true) {
                            props.setCheckedValue(option.value)
                        }
                    }}
                    ref={props.ref}
                />
            </li>
        )
    })

    return (
        <ul className={props.className}>
            {radiobuttons}
        </ul>
    )
}

export const clearRadioButtons = (name: string) => {
    const inputs = document.getElementsByTagName('input')
    for (const input of inputs) {
        if (input.type === 'radio' && input.name === name) {
            input.checked = false
        }
    }
}
