import { useSelector } from "react-redux"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { decrement, increment } from "../Slices/CounterSlice";


export const Counter = () => {

    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <>
         <button onClick={() => dispatch(increment())}> Increment ++ </button>
         <h3> Counter is - {count} </h3>
         <button onClick={() => dispatch(decrement())}> Decrement -- </button>
        </>
    )
}