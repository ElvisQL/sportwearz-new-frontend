
import { Link } from "react-router-dom";
import { BsTrashFill } from "react-icons/bs";
import Brand from "../../images/logo.png"
import {useDispatch, useSelector} from "react-redux";
import {finalizarCompra, getCurrentUser, removeFromCart} from "../../redux/slices/userSlice.js";
import PurchaseCompleted from "./PurchaseCompleted.jsx";
import {useState} from "react";
import {ClipLoader} from "react-spinners";

const Checkout = () => {
    const [purchaseCompleted, setPurchaseCompleted] = useState(false); // Estado local
    const dispatch = useDispatch()
    const user = useSelector(getCurrentUser)
    const { token, role,username, cart} = user.user;
    const [isProcessing, setIsProcessing] = useState(false);
    const deleteHandler = async(itemId) => {
        try {
            var res = await dispatch(removeFromCart(itemId))
            console.log(res)

        }
        catch (e) {
            console.log(e)
            throw e
        }
    }

    const handleSubmit = async()=> {
        try{
            setIsProcessing(true);
            const ventaData = {

                DetalleVenta: cart.cartItems.map(item => ({
                    IdProducto: item.productId,
                    Cantidad: item.quantity,
                    Total: item.total,
                    ImagenUrl: item.imageUrl
                })),
                Total: cart.totalPrice,
                Estado: "Pendiente",
                UsuarioNombre: username
            };
            var res = await dispatch(finalizarCompra(ventaData));
            console.log(res)
            if (res.payload?.success) {
                setPurchaseCompleted(true); // Actualiza el estado
            }
        }catch (e) {
            console.log(e)
            throw e;
        }finally {
            setIsProcessing(false)
        }

    }

    // Render condicional
    if (purchaseCompleted) {
        return <PurchaseCompleted username={username} />;
    }
    return cart.cartItems.length === 0 ? (
        <main>
            <div className="without-products">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/proyectofinalreactjs-elvis.appspot.com/o/images%2Fcarritovacio.png?alt=media&token=971d2a0e-0dc2-406e-9293-9fec3721495c"
                    alt=""
                />
                <h1>Carrito Vacio</h1>
                <span>Agregue productos al carrito</span>
                <Link className="link-boton" to={"/"}>
                    Ir al Catalogo
                </Link>
            </div>
        </main>
    ) : (
        <>
            <header className="header-checkout">
                <img src={Brand} alt="logo-sportwearz" />
            </header>
            <main className="checkout-view">
                <div className="hay-productos">
                    <h1>TU CARRITO:</h1>
                    <div className="titulos-resumen">
                        <span className="titulo-producto">Producto:</span>
                        <span className="titulo-precio">Precio Unitario:</span>
                        <span className="titulo-cantidad">Cantidad:</span>
                        <span className="titulo-preciototal">Precio Total:</span>
                    </div>

                    <ul className="lista-carrito">
                        {cart.cartItems.map((p) => (
                            <li className="card-producto-en-espera" key={p.cartItemId}>
                                <div className="titulo-producto">
                                    <BsTrashFill
                                        className="bi-trash"
                                        onClick={() => deleteHandler(p.cartItemId)} //TODO: borraritem aqui
                                    ></BsTrashFill>
                                    <div className="container-img-cart">
                                        <img src={p.imageUrl} alt="imagen-producto" />
                                    </div>
                                    <span>{p.productName}</span>
                                </div>
                                <div className="titulo-precio">
                                    <span className="titulo-precio">${p.price}</span>
                                </div>
                                <div className="titulo-cantidad">
                                    <span className="titulo-cantidad">{p.quantity}</span>
                                </div>
                                <div className="titulo-preciototal">
                  <span className="titulo-spreciototal">
                    ${p.total}
                  </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="resume">
                    <h2>Resumen</h2>
                    <div className="resume-1">
                        <label htmlFor="cupon">Cupon de descuento</label>
                        <input name="cupon" type="text" />
                    </div>
                    <div className="resume-2">
                        <span>
                          Subtotal <b>{cart.totalPrice}$</b>
                        </span>
                        <span>
                          Total <b>{cart.totalPrice}$</b>
                        </span>
                    </div>
                    <div className="resume-3">
                        <div className="envio-box">
                            <label htmlFor="envio">Calcular envio:</label>
                            <input
                                name="envio"
                                type="text"
                                placeholder="Ingrese codigo postal"
                            />
                        </div>
                        <Link to={"/catalogo"}>
                            <button>Seguir Comprando</button>
                        </Link>

                        <button onClick={()=> handleSubmit()} disabled={isProcessing}>
                            {isProcessing ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <ClipLoader
                                        color="#ffffff" // Color blanco (ajusta según tu diseño)
                                        size={18} // Tamaño pequeño para el botón
                                        speedMultiplier={0.8} // Velocidad de animación
                                    />
                                    <span>Procesando...</span>
                                </div>
                            ) : (
                                "Finalizar Compra"
                            )}

                        </button>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Checkout;
