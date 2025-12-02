import { Field } from "@/lib/types";
import { FlexBox, FlexCell } from "../ui/xflex"
import style from '@/app/world/page.module.css';

const FlexTable = (props: {
    fields: string[][],
    widths: number[],
}) => {
    return (
        <FlexBox
            flexDirection={"column"}
            flexWrap="nowrap"
            alignItems={"stretch"}
            justifyContent={"flex-start"}
            className={style["city-container"]}
            height={"100%"}
            overflowX="hidden"
            overflowY="auto"
        >
            {props.fields.map((field, index) => {
                return (
                    <FlexCell
                        key={index}
                        flex="1 0 1em"
                        overflowX="hidden"
                        overflowY="hidden"
                        className={style["table-value-cell"]}
                    >
                        <FlexTableRow
                            field={field}
                            widths={props.widths}
                        />
                    </FlexCell>
                )
            })}
        </FlexBox>
    )
}

const FlexTableRow = (props: {
    field: string[],
    widths: number[],
}) => {
    return (
        <FlexBox
            flexDirection={"row"}
            flexWrap="nowrap"
            alignItems={"stretch"}
            justifyContent={"flex-start"}
            className={style["city-container"]}
            overflowX="hidden"
            overflowY="hidden"
            height={"auto"}
        >
            <FlexCell
                flex={`${props.widths[0]} 0 1em`}
                overflowX="hidden"
                overflowY="hidden"
                className={style["table-value-cell"]}
            >
                <span>{props.field[0]}</span>
            </FlexCell>
            <FlexCell
                flex={`${props.widths[1]} 0 1em`}
                overflowX="hidden"
                overflowY="hidden"
                className={style["table-value-cell"]}
            >
                <span>{props.field[1]}</span>
            </FlexCell>
        </FlexBox>
    )
}

export default FlexTable