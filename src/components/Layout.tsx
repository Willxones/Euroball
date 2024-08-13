import { Outlet } from "react-router-dom";
import Header from "./Header";
import PageFooter from "./PageFooter";

export default function Layout() {
    return(
        <>
            <Header/>
            <Outlet/>
            <PageFooter/>
        </>
    )
}