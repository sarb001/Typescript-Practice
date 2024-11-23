import  {  configureStore } from '@reduxjs/toolkit' ;
import CounterReducer  from '../Slices/CounterSlice';

export const mainstore = configureStore({
    reducer : {
        counter  : CounterReducer, 
    },
})

export type RootState = ReturnType<typeof mainstore.getState>
export type AppDispatch = typeof mainstore.dispatch