import { Outlet } from "react-router-dom";
import Header from "./Header";
import PageFooter from "./PageFooter";

export default function Layout() {
    return(
        <>
        <div className="flex min-h-screen flex-col">
            <Header/>
            <Outlet/>
            <PageFooter/>
        </div>
        </>
    )
}