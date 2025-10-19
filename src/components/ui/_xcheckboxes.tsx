import { ChangeEventHandler, Ref } from "react"

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

export type CheckboxValue = {
    checked: boolean,
    name: string,
    label: string,
}

const _setChecked = (values: CheckboxValue[], name: string, setChecked: Function) => {
    const checkedValues: CheckboxValue[] = []
    const checkedNames: string[] = []

    for (const value of values) {
        if (value.name === name) {
            checkedValues.push({
                checked: !value.checked,
                name: value.name,
                label: value.label,
            })
        }
        else {
            checkedValues.push(value)
        }
        if (value.checked) {
            checkedNames.push(value.name)
        }
    }
    setChecked(checkedNames)
    console.log('checkedNames:', checkedNames)
    console.log('checkedValues:', JSON.stringify(checkedValues, null, 4))    
    return checkedValues
}

export const CheckboxGroup = (props: {
    className?: string,
    labelClass?: string,
    boxClass?: string,
    listItemClass?: string,
    checkboxValues: CheckboxValue[],
    setChecked: Function,
    ref: Ref<HTMLInputElement>
}) => {
    const checkboxes = props.checkboxValues.map((checkbox, index) => {
        return (
            <li
                key={index}
                className={props.listItemClass}
            >
                <Checkbox
                    label={checkbox.label}
                    name={checkbox.name}
                    checked={checkbox.checked}
                    boxClass={props.boxClass}
                    labelClass={props.labelClass}
                    onChange={(e) => _setChecked(
                        props.checkboxValues, 
                        checkbox.name, 
                        props.setChecked
                    )}
                    ref={props.ref}
                />
            </li>
        )
    })
    return (
        <div className={props.className}>
            <ul>
                {checkboxes}
            </ul>
        </div>
    )
}
