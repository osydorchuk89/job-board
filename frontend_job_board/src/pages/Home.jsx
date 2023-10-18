import { TopNavBar } from "../components/TopNavBar";
import { SearchArea } from "../components/SearchArea";
import { PopularCategories } from "../components/PopularCategories";
import { BottomNavBar } from "../components/BottomNavBar";

export const Home = () => {
    return (
        <>
            <TopNavBar />
            <SearchArea />
            <PopularCategories />
            <BottomNavBar />
        </>
    )
};