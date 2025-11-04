import { useState } from "react";

export default function Contador({ initial = 0 }) {
  const [count, setCount] = useState(initial);

  return (
    <div>
      <p data-testid="count">{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(0)}>❌</button>
    </div>
  );
}
