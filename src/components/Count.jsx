import { useState } from "react";
import { BsPlusCircleFill, BsDashCircleFill } from "react-icons/bs";

const Count = ({ stock, añadir }) => {
    const [counter, setCounter] = useState(1);
    const [messageError, setMessageError] = useState("");
    const [isOutOfStock, setIsOutOfStock] = useState(false);

    const decrementar = () => {
        if (counter > 1) {
            setCounter(counter - 1);
            setMessageError("");
            setIsOutOfStock(false);
        }
    };

    const incrementar = () => {
        if (stock > counter) {
            setCounter(counter + 1);
            setMessageError("");
            setIsOutOfStock(false);
        } else {
            setMessageError("Se supero el limite de Stock disponible!");
            setIsOutOfStock(true);
        }
    };

    return (
        <>
            <div className="count">
                <div className="count-body">
                    <BsDashCircleFill className="boton-plus-less" onClick={decrementar} />
                    <span>{counter}</span>
                    <BsPlusCircleFill className="boton-plus-less" onClick={incrementar} />
                </div>
            </div>
            <button
                disabled={isOutOfStock}
                className={`link-boton ${isOutOfStock ? "disabled" : ""}`}
                onClick={() => añadir(counter)}
            >
                {isOutOfStock ? "Sin Stock" : "Agregar Al carrito"}
            </button>
            {messageError && (
                <div className="error-message">
                    <span>{messageError}</span>
                </div>
            )}
        </>
    );
};

export default Count;