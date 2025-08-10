import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from "../features/counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="counter-container">
      <h3>Redux Toolkit Counter</h3>
      <div className="counter-value">{count}</div>
      <div className="counter-buttons">
        <button onClick={() => dispatch(decrement())}>-1</button>
        <button onClick={() => dispatch(increment())}>+1</button>
      </div>
    </div>
  );
}

export default Counter;