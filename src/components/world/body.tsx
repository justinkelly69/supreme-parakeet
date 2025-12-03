import { ReactElement } from "react";
import { FlexBox, FlexCell } from "../ui/xflex"
import style from '@/app/protected/world/page.module.css';

const Body = (props: {
    menu: ReactElement | ReactElement[] | string | null,
    body: ReactElement | ReactElement[] | string | null,
}) => {
    return (
        <FlexBox
            flexDirection={"column"}
            flexWrap="nowrap"
            alignItems={"stretch"}
            justifyContent={"flex-start"}
            className={style["container"]}
            height={"100%"}
        >
            <FlexCell
                flex="1 0 1em"
                overflowX="hidden"
                overflowY="hidden"
                className={style["container-controls"]}
            >
                <>{props.menu}</>
            </FlexCell>
            <FlexCell
                flex="20 0 1em"
                overflowX="hidden"
                overflowY="scroll"
                className={style["container-map"]}
            >
                <>{props.body}</>
            </FlexCell>
        </FlexBox>
    )
}

export default Body
