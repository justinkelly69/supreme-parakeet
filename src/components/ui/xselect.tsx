import * as React from "react"
import { ChangeEventHandler, JSX } from "react"

type OptionArgs = {
    value: string,
    label: string,
}

const Select = (props: {
    className: string,
    onChange: ChangeEventHandler<HTMLSelectElement>,
    options: OptionArgs[],
    value?: string,
    defaultValue?: string,
}) => {

    const options = props.options.map((option, index) => {
        return (
            <Option
                key={index}
                value={option.value}
                label={option.label}
            />
        )
    })

    return (
        <select
            defaultValue={props.defaultValue}
            value={props.value}
            onChange={props.onChange}>
            {options}
        </select>
    )
}

const Option = (props: {
    value: string,
    label: string,
}) => {
    return (
        <option
            value={props.value}>
            {props.label}
        </option>
    )
}

export default Select