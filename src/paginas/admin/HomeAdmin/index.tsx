import { Outlet } from "react-router-dom"
import HeaderAdmin from "../../../componentes/HeaderAdmin"

const HomeAdmin = () => {
    return(
        <>
            <HeaderAdmin/>
            <Outlet/>
        </>
    )
}

export default HomeAdmin