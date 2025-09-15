import * as React from "react"
import { ChangeEventHandler } from "react"

export type CheckBoxData = {
    checked: boolean,
    name: string,
    label: string,
}

const Checkbox = (props: {
    label: string,
    name: string,
    checked?: boolean,
    className?: string,
    labelClass?: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}) => {
    return (
        <label className={props.labelClass}>
            <input type="checkbox"
                name={props.name}
                className={props.className}
                defaultChecked={props.checked}
                onChange={props.onChange} 
            />
            {props.label}
        </label>
    )
}

export default Checkbox
