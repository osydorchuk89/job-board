import { Outlet } from "react-router-dom";
import { TopNavBar } from "../components/TopNavBar";
import { BottomNavBar } from "../components/BottomNavBar";

export const Root = () => {
    return (
        <>
            <TopNavBar></TopNavBar>
            <Outlet></Outlet>
            <BottomNavBar></BottomNavBar>
        </>
    )
}