import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/tshooks";
import { FetchProduct,  filterByBrands,  filterByCategory, filterByRating  } from "../slices/ProductSlice";


export const Sidebar = () => {
    
    const { data , FilterProducts } = useAppSelector(state => state?.product);
    console.log('data is =',data);
    
    const UniqueCategory = [...new Set (data?.map(i=> i?.category))];
    console.log(' uni cat =',UniqueCategory);
    
    const AllPrices = [...new Set (data?.map(i=> i?.price.toFixed()))]
    console.log(' All Prices =',AllPrices);
    
    const AllRating = [...new Set (data?.map(i=> i?.rating))]
    console.log(' All Ratings =',AllRating);
    
    console.log('Filter Products --',FilterProducts);


    const AllBrands = [...new Set (data?.map(i=> i?.brand))]
    console.log(' All Brands =',AllBrands);


    const dispatch = useAppDispatch();

    useEffect(() => {
        FetchProduct();
    },[])



    return (
        <div className="p-4">
            <div className="my-5"> 
                <div className="text-3xl py-4"> Filter By Category  </div>
                 <div className="flex flex-row flex-wrap gap-4">

                    {UniqueCategory?.map(i =>   
                    <button className="bg-slate-400 px-1 mx-2" onClick={() => dispatch(filterByCategory(i))}>
                         {i.toUpperCase()} 
                    </button> )}
                
                 </div>
            </div>

            <div className="my-4">
                <div className="text-3xl py-4"> Filter By Brand  </div>
                <div className="flex flex-row flex-wrap gap-4">
                    {AllBrands?.map(i =>   
                    <button className="bg-slate-400 px-1 mx-2" onClick={() => dispatch(filterByBrands(i))}>
                       {i.toUpperCase()}
                    </button> )}
                 </div>
            </div>

            <div className="my-4">
                <div className="text-3xl py-4"> Filter By Rating  </div>
                <div className="flex flex-row flex-wrap gap-4">
                    {AllRating?.map(i =>   
                    <button className="bg-slate-400 px-1 mx-2" onClick={() => dispatch(filterByRating(i))}>
                       {i}
                    </button> )}
                 </div>
            </div>


        </div>
    )
}