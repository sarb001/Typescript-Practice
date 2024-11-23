import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Products =   {
    id : number,
    title : string,
    category : string,
    price : number,
    rating : number,
    thumbnail : string,
    brand : string,
}


export type initState = {
    isLoading : boolean,
    data: Products[],
    isError : boolean
    FilterProducts : Products[] ,
    activeFilters : {
        category : string | null;
        brands : string | null;
        rating : string | null;
    }
}

export const initialState : initState = {
    isLoading : false,
    data : [{
        id : 1,
        title : '',
        category : '',
        price : 0,
        rating : 0,
        thumbnail : '',
        brand : ''
    }] ,
    isError : false,
    FilterProducts : [],
    activeFilters : {
        category : null,
        brands : null,
        rating : null
    }
}

export const FetchProduct = createAsyncThunk("/" , async () => {
    try {
        // const response = await fetch('https://dummyjson.com/products');
        const response = await fetch('https://6741ac14e4647499008e6978.mockapi.io/products');
        const resp2 =  await response.json();
        console.log('response data --',resp2);
        return resp2;
    } catch (error) {
            console.log('Error is -',error);
    }
})

export const applyFilters = (state:initState) => {
    let result = [...state.data];

    if (state.activeFilters.category) {
        result = result.filter(product => 
          product.category === state.activeFilters.category
        );
    }

    if (state.activeFilters.brands) {
        result = result.filter(product => 
          product.brand === state.activeFilters.brands
        );
    }

    if (state.activeFilters.rating) {
        result = result.filter(i => i?.rating <= Number(state.activeFilters.rating))
    }

    state.FilterProducts = result;

}


export const ProductSlice  = createSlice({
    name : 'products',
    initialState,
    reducers : {

        filterByCategory : (state,action) => {
            state.activeFilters.category = action.payload; 
            applyFilters(state);
        },

        filterByBrands : (state,action) => {
            state.activeFilters.brands = action.payload; 
            applyFilters(state);
        },

        filterByRating : (state,action) => {
            state.activeFilters.rating = action.payload; 
            applyFilters(state);
        }
    },
    extraReducers : (builder) => {
        builder.addCase(FetchProduct.pending ,  (state,action) => {
                state.isLoading = true;
        });
        builder.addCase(FetchProduct.fulfilled , (state,action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.FilterProducts = action.payload;
        });
        builder.addCase(FetchProduct.rejected ,  (state,action) => {
                state.isError = true;
        });
    }
})


export const { filterByCategory , filterByBrands ,filterByRating } = ProductSlice.actions;
export default ProductSlice.reducer
