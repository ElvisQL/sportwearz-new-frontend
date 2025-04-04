import {useDispatch,useSelector} from "react-redux"
import {addToCart} from "../redux/slices/userSlice.js";
import {useState} from "react";
import Count from "./Count.jsx";
import {toast, ToastContainer, Zoom} from "react-toastify";
export const ItemDetail = ({product})=> {

    console.log(product)
    const dispatch = useDispatch()
    const {user} = useSelector(state=> state.user.user)

    const handleAddToCart = async (quantity) => {
        console.log("llegue aqui")
        if (!user?.token) {
            toast.error('Debes iniciar sesión');
            return;
        }


        try {
            const res = await dispatch(addToCart({
                productId: product.productId,
                quantity,


            }));
            console.log(res)
            toast.success('Producto agregado al carrito');
        } catch (error) {
            toast.error(error);
        }
    };
    return(<>
        <div className={"item-detail"}>
            <div className={"item-detail__container"}>
                <div className={" item-detail__image-container"} >
                    <img className={"image_url"} src={product.imageURL} alt={"imagenporducto"}/>
                </div>
                <div className={"item-detail__info"}>
                    <h2 className="item-detail__name">{product.productName}</h2>
                    <span>Descripción: <p className="item-detail__description">{product.description}</p></span>

                    <span className="item-detail__price">Precio: {product.price}</span>
                    <Count añadir={(quantity) => handleAddToCart(quantity)} stock={product.stock}/>

                </div>
            </div>
        </div>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="dark"
            transition={Zoom}
        />
    </>)
}
