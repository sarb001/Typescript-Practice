import { HeaderSection } from "./HeaderSection";
import { MainProductsSection } from "./MainProductsSection";
import { Sidebar } from "./Sidebar";


export const MainSection = () => {
    return (
        <div className="grid grid-cols-[2fr,5fr]">
            <div>  <Sidebar /> </div>
            <div>  
              <div> <HeaderSection />   </div>
              <div> <MainProductsSection  />   </div>
             </div>
        </div>
    )
}