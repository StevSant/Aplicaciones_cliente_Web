import { useState } from "react";
import "./Contador.css";

function Contador({ titulo, inicio = 0, numero = 1 }) {
  const [count, setCount] = useState(inicio);

  const incrementar = () => {
    setCount((prevCount) => prevCount + numero);
  };

  const decrementar = () => {
    setCount((prevCount) => prevCount - numero);
  };

  const reiniciar = () => {
    setCount(inicio);
  };

  return (
    <div className="contador-container">
      <h2 className="contador-titulo">{titulo}</h2>
      <p className="contador-valor">{count}</p>
      <div className="contador-botones">
        <button
          onClick={decrementar}
          className="contador-btn contador-btn--decrementar"
        >
          - {numero}
        </button>
        <button
          onClick={reiniciar}
          className="contador-btn contador-btn--reiniciar"
        >
          Reiniciar
        </button>
        <button
          onClick={incrementar}
          className="contador-btn contador-btn--incrementar"
        >
          + {numero}
        </button>
      </div>
    </div>
  );
}

export default Contador;
