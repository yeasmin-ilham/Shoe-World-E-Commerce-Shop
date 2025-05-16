import { FeaturedProduct } from "../components/storefront/Featured";
import { HeroNext1 } from "../components/storefront/HeroNextPage1";
import HeroPage from "../components/storefront/HeroPage";


export default function indexPage(){
    return(
        <div>
            <HeroPage/>
            <HeroNext1/>
            <FeaturedProduct/>
        </div>
    )
}