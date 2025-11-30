import Link from "next/link";

const Breadcrumbs = (props: { crumbs: string[] }) => {

    return (
        <nav aria-label="breadcrumb">
            <ul>
                <li key={0}>
                    <Link href={`/world`}>{'world'}</Link>
                </li>
                {props.crumbs.map((crumb, index) => {
                    const href = props.crumbs.slice(0, index + 1).join('/')

                    return (
                        <li key={index}>
                            <Link href={`/world/${href}`}>{crumb}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Breadcrumbs;