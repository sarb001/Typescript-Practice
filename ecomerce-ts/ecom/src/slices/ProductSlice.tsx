import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
        price : number | null;
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
        price : null,
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

// Single filter Critiera Done

// ---- Now Applying Filter in Sequencential Products

export const ProductSlice  = createSlice({
    name : 'products',
    initialState,
    reducers : {    
      UpdateFilter : (state:initState,action: PayloadAction<{
        type : 'category' | 'brands' | 'price' | 'rating';
        value : any;
    }>) => {

        const { type ,value } = action.payload;

            // specific for Price 
        if(type === 'price'){
            state.activeFilters.price = value;    
            console.log('with val -',state.activeFilters.price= value)      // 
        }else{
            state.activeFilters[type] = value;
            console.log('with type -',state.activeFilters[type] = value)      // 
        }

        let result = [...state.data];

        if (state.activeFilters.category) {
            result = result.filter(product => 
            product.category === state.activeFilters.category
            );
            console.log(`After category filter: ${result.length} products`);
        }

        if (state.activeFilters.brands) {
            result = result.filter(product => 
            product.brand === state.activeFilters.brands
            );
            console.log(`After Brand filter: ${result.length} products`);
        }

        if (state.activeFilters.rating) {
            result = result.filter(i => i?.rating < Number(state.activeFilters.rating));
            console.log(`After Rating filter: ${result.length} products`);
        
        }

        state.FilterProducts = result;
    },
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


export const { UpdateFilter } = ProductSlice.actions;
export default ProductSlice.reducer
