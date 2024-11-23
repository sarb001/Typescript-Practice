import { useDispatch, useSelector } from "react-redux"
import { FetchProduct } from "../slices/ProductSlice";
import { useAppDispatch, useAppSelector } from "../hooks/tshooks";
import { useEffect, useState } from "react";


export const MainProductsSection = () => {

     const dispatch = useAppDispatch();
     const {   isLoading , data , isError } = useAppSelector(state => state?.product);

     useEffect(() => {
        dispatch(FetchProduct());
     },[dispatch])

     if(isLoading){
        return (
            <h2> Loading................... </h2>
        )
     }


    return (
        <div>
            <div className="p-4"> 
             <div> Total Products -  {data?.length} </div> 
            <div className="grid grid-cols-3 gap-6">
                
                {data?.map(i => {
                    return (
                        <div key = {Number(i?.id)} className="bg-slate-400 px-2 my-2">
                            <div>  
                                 <span> {Number(i?.id)}  </span>
                                 <span> {i?.title}  </span>
                            </div>

                            <div>
                                <img src = {i?.thumbnail}  alt = {i?.title} />
                            </div>

                            <div className="grid grid-cols-3 gap-4 x-4">  
                                <span className="bg-green-100" >  {i?.category}  </span>
                                <span className="bg-green-100" >  {i?.brand}  </span>
                                <span className="bg-green-100">  Rs. {i?.price.toFixed()}/-  </span>
                                <span className="bg-green-100">  {Number(i?.rating)} Star  </span>
                            </div>
                        </div>
                    )
                })}
                
            </div>
             </div>
        </div>
    )
}