import * as React from "react"
import { ChangeEventHandler, Ref } from "react"

// export type CheckBoxData = {
//     checked?: boolean,
//     name: string,
//     label: string,
// }

export const Checkbox = (props: {
    name: string,
    checkedValues: string[],
    setCheckedValues: (names: string[]) => void,
    showCheckbox: boolean,
    className?: string,
    ref: Ref<HTMLInputElement>
}) => {
    return props.showCheckbox ?
        <input type="checkbox"
            name={props.name}
            className={props.className}
            defaultChecked={props.checkedValues.includes(props.name)}
            onChange={e => {
                if (e.target.checked === true) {
                    props.setCheckedValues([...props.checkedValues, props.name])
                }
                else {
                    props.setCheckedValues(props.checkedValues.filter(e => e !== props.name))
                }
            }}
            ref={props.ref}
        /> : null
}
