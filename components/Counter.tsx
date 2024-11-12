"use client";
import {
  decrement,
  decrementByAmount,
  increment,
  incrementAsync,
  incrementByAmount,
} from "@/state/counter/counterSlice";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col items-center gap-10">
      <h2 className="text-2xl font-semibold">{count}</h2>
      <div className=" flex flex-row items-center justify-between gap-4">
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementByAmount(10))}>
          Increment by 10
        </button>
        <button onClick={() => dispatch(decrementByAmount(10))}>
          Decrement by 10
        </button>
        <button onClick={() => dispatch(incrementAsync(10))}>
          Increment Async
        </button>
      </div>
    </div>
  );
};

export default Counter;
