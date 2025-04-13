import logo from "../images/logo.png"
import {useDispatch, useSelector} from "react-redux";
import {addToCart, getCurrentUser, removeFromCart, updateItemQuantity} from "../redux/slices/userSlice.js";
import {Link, useNavigate, useParams} from "react-router-dom";
import {publicRoutes, userRoutes} from "../routes/routes.js";
import {IoIosLogOut, IoMdPerson} from "react-icons/io";
import {Badge, Drawer, Menu} from "antd";
import {FaMinus, FaPlus, FaShoppingCart, FaStar, FaTrash} from "react-icons/fa";
import {useState} from "react";
import {HiOutlineMenu} from "react-icons/hi";




export const Header  = () => {
    const dispatch = useDispatch()
    const user  = useSelector(getCurrentUser);
    const { token, role,username, cart} = user.user;
    const navigate = useNavigate();
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isMenuMobileVisible, setIsMenuMobileVisible] = useState(false);


    const itemsHeaderMenuIndumentarias=[
        {label:"Indumentarias",key:"indumentariaskey",children:[ {
                label:"Genero",
                key:"generokey",
                children:[{
                    key:"hombres",
                    label:"Hombre",
                    onClick: () => navigate(`/${username}/${userRoutes.CATALOG}?categoriaId=1009`),
                },
                    {
                        key:"mujer",
                        label:"Mujer",
                        onClick: () => navigate(`/${username}/${userRoutes.CATALOG}?categoriaId=1008`),
                    },
                    {
                        key:"niños",
                        label:"Niños",
                        onClick: () => navigate(`/${username}/${userRoutes.CATALOG}?categoriaId=1010`),
                    }
                ]
            },
                {label:"Categoria",key:"categoriakey",children: [
                        {label:"Buzos",key:"Buzos",onClick: () => navigate(`/${username}/${userRoutes.CATALOG}?categoriaId=1013`),},{label:"Calzas",key:"calzaskey",onClick: () => navigate(`/${username}/${userRoutes.CATALOG}?categoriaId=1011`),},{label:"Camisetas",key:"camisetaskey",onClick: () => navigate(`/${username}/${userRoutes.CATALOG}?categoriaId=1016`),},{label:"Camperas",key:"camperaskey",onClick: () => navigate(`/${username}/${userRoutes.CATALOG}?categoriaId=1015`),},{label:"Chombas",key:"chombaskey",onClick: () => navigate(`/${username}/${userRoutes.CATALOG}?categoriaId=1019`),},{label:"Pantalones",key:"pantaloneskey",onClick: () => navigate(`/${username}/${userRoutes.CATALOG}?categoriaId=1021`),}
                    ]},
                ]}

    ]
    const itemsHeaderMenuMarcas =[
        {
            label:"Marcas",
            key:"marcaskey",
            children:[
                {
                    label:"Adidas",
                    key:"adidaskey",
                    onClick: () => navigate(`/${username}/${userRoutes.CATALOG}?marcaId=10`),
                }
                ,{
                    label:"Nike",
                    key:"nikekey",
                    onClick:() => navigate(`/${username}/${userRoutes.CATALOG}?marcaId=1`)
                },
                {
                    label:"Puma",
                    key:"pumakey",
                    onClick:() => navigate(`/${username}/${userRoutes.CATALOG}?marcaId=16`)
                },
                {
                    label:"Topper",
                    key:"topperkey",
                    onClick:() => navigate(`/${username}/${userRoutes.CATALOG}?marcaId=13`)
                },
                {
                    label: "Under Armour",
                    key:"underarmourkey",
                    onClick:() => navigate(`/${username}/${userRoutes.CATALOG}?marcaId=17`)
                }
                ]
        }
    ] //todo agregar iconos
    const itemsHeaderUserMenu = [
        {
            key:'user',

            icon: <IoMdPerson/>,
            children: [
                {
                    key:"fav",
                    label: "Ver Favoritos",
                    icon:<FaStar />,
                },
                {
                    key:"logout",
                    label: "Cerrar Sesion",
                    icon: <IoIosLogOut />,
                }
            ]
        }
    ]

    const showCart = () => {
        setIsCartVisible(true);
    };
    const showMenuMobile = () => {
        setIsMenuMobileVisible(true)
    }
    const hideCart = () => {
        setIsCartVisible(false);
    };
    const hideMenuMobile = () => {
        setIsMenuMobileVisible(false)
    }
    const onMenuClick = ({ key }) => {
        if (key === "logout") {
            navigate("/login")
        }
        if (key === "fav") {
            navigate("/favoritos"); // Navegar a la página de favoritos si es necesario
        }
    };


    const handleIncreaseQuantity = async(productId) => {
        try {
            const res = await dispatch(addToCart({
                productId: productId,
                quantity: 1
            }))
            console.log(res)

        }catch (e) {
            console.error("error al incrementar cantidad: ",e);
        }
    }

    const handleDecreaseOrRemove = async (cartItemId, quantity) =>  {
        try{
            if(quantity === 1 ){
                const res  = await dispatch(removeFromCart(cartItemId))
                console.log(res)
            }
            else{
                const res = await dispatch(updateItemQuantity({
                    cartItemId,
                    quantity: quantity - 1,
                }))
                console.log(res)
            }
        }
        catch (e) {
            console.error("error al actualizar cantidad", e)
        }
    }

    return (
        <header>
            <div className={"topHeader"}>
                <div className={"toggleMenuSandwich"} onClick={setIsMenuMobileVisible}>
                    <HiOutlineMenu />
                </div>
                <div className={"brand"}>
                    <Link to={"/"}>
                        <img src={logo} alt={"logo"}/>
                    </Link>
                </div>
                <div className={"buttonsOfRight"}>
                    {token ? (
                        <div className={"user-menu-container"}>
                            <span>{`Hola!, ${username}`}</span>
                            <Menu
                                className={"user-menu"}
                                items={itemsHeaderUserMenu}
                                mode="vertical"
                                popupplacement="bottomRight"
                                onClick={onMenuClick}
                            />
                        </div>

                    ) : (
                        <Link to="/login">
                            <IoMdPerson className={"iconTopHeader"}/>
                        </Link>
                    )}

                    <Badge color={"info"} showZero count={
                        cart?.cartItems?.reduce((total, item)=> total + item.quantity , 0)
                    }>
                        <FaShoppingCart className={"iconTopHeader"} onClick={showCart}/>
                    </Badge>

                </div>

            </div>

            <div className={"bottomHeader"}>
                <ul>
                    <li>
                        <Link to={`/${username}/${userRoutes.CATALOG}`}>
                            Catalogo
                        </Link>

                    </li>

                    <li>
                        <Menu className="menu-indumentarias" mode="vertical" items={itemsHeaderMenuIndumentarias} />
                    </li>
                    <li>
                        <Menu className="menu-marcas" mode="vertical" items={itemsHeaderMenuMarcas} />
                    </li>
                </ul>
            </div>


            <Drawer
                className={"drawerMobileMenu"}
                title = {`hola! ${username}`}
                placement = "left"
                open = {isMenuMobileVisible}
                onClose={hideMenuMobile}
            >
                {
                    <div className={"containerMenuMobile"}>
                        <div className={"principalButtonsNavigation"}>
                            <Menu
                                className={"user-menu"}
                                items={itemsHeaderUserMenu}
                                mode="vertical"
                                popupplacement="bottomRight"
                                onClick={onMenuClick}
                            />
                            <Badge color={"info"} showZero count={
                                cart?.cartItems?.reduce((total, item)=> total + item.quantity , 0)
                            }>
                                <FaShoppingCart className={"iconTopHeader"} onClick={showCart}/>
                            </Badge>
                        </div>
                        <div className={"navigationCatalog"}>
                            <ul>
                                <li>
                                    <Link to={`/${username}/${userRoutes.CATALOG}`}>
                                        Catalogo
                                    </Link>

                                </li>

                                <li>
                                    <Menu className="menu-indumentarias" mode="vertical" items={itemsHeaderMenuIndumentarias} />
                                </li>
                                <li>
                                    <Menu className="menu-marcas" mode="vertical" items={itemsHeaderMenuMarcas} />
                                </li>
                            </ul>
                        </div>
                    </div>
                }
            </Drawer>

            <Drawer
                title="Carrito de Compras"
                placement="right"
                onClose={hideCart}
                width={400}
                open={isCartVisible}

            >
                {cart?.cartItems?.length === 0 ? (
                    <div className="empty-cart">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/proyectofinalreactjs-elvis.appspot.com/o/images%2Fcarritovacio.png?alt=media&token=971d2a0e-0dc2-406e-9293-9fec3721495c"
                            alt="Carrito vacío"
                            style={{ width: "100%", maxWidth: "250px", margin: "0 auto", display: "block" }}
                        />
                        <p style={{ textAlign: "center", marginTop: "20px" }}>
                            Tu carrito está vacío
                        </p>
                    </div>
                ) : (
                    <div className="cart-content">
                        {cart?.cartItems?.map((item) => (
                            <div key={item.cartItemId} className="cart-item">
                                <div className="cart-item-image">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.productName}
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            objectFit: "cover",
                                            borderRadius: "5px",
                                        }}
                                    />
                                </div>

                                <div className="cart-item-details">
                                    <h4 style={{ margin: 0 }}>{item.productName}</h4>
                                    <p style={{ margin: "5px 0" }}>${item.price.toFixed(2)} c/u</p>

                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => handleDecreaseOrRemove(item.cartItemId, item.quantity)}
                                            className="quantity-btn"
                                        >
                                            {item.quantity === 1 ? <FaTrash /> : <FaMinus />}
                                        </button>

                                        <span className="quantity-number">{item.quantity}</span>

                                        <button
                                            onClick={() => handleIncreaseQuantity(item.productId)}
                                            className="quantity-btn"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-item-total">
                                    <p>${(item.total).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}

                        <div style={{ marginTop: "20px", borderTop: "1px solid #eee", paddingTop: "15px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                                <span>Total:</span>
                                <span>${cart?.totalPrice?.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={() => {

                                    hideCart();
                                    navigate(`/${username}/${userRoutes.CHECKOUT}`);
                                }}
                                style={{
                                    width: "100%",
                                    marginTop: "20px",
                                    padding: "10px",
                                    backgroundColor: "#1890ff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                }}
                            >
                                Avanzar con la compra
                            </button>
                        </div>
                    </div>
                )}
            </Drawer>

        </header> );



}
