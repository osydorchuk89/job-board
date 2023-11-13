import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TopNavBar } from "../components/TopNavBar";
import { BottomNavBar } from "../components/BottomNavBar";

export const Root = () => {

    const ScrollToTopWrapper = ({ children }) => {
        const location = useLocation();
        useLayoutEffect(() => {
            document.documentElement.scrollTo(0, 0);
        }, [location.pathname]);
        return children;
    };


    return (
        <ScrollToTopWrapper>
            <TopNavBar></TopNavBar>
            <Outlet></Outlet>
            <BottomNavBar></BottomNavBar>
        </ScrollToTopWrapper>
    )
}