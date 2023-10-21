import { SearchArea } from "../components/SearchArea";
import { PopularCategories } from "../components/PopularCategories";

export const Home = props => {

    const onClickSearchDisplay = userQuery => {
        props.onClickSearch(userQuery);
    }

    return (
        <>
            <SearchArea onClickSearch={onClickSearchDisplay} />
            <PopularCategories />
        </>
    )
};