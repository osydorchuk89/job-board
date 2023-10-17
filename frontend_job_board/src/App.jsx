import { TopNavBar } from "./components/TopNavBar/TopNavBar";
import { SearchArea } from "./components/SearchArea/SearchArea";
import { PopularCategories } from "./components/PopularCategories/PopularCategories";
import { BottomNavBar } from "./components/BottomNavBar/BottomNavBar";

export const App = () => {
    return (
        <>
            <TopNavBar />
            <SearchArea />
            <PopularCategories />
            <BottomNavBar />
        </>
    )
};