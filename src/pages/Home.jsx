import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import slider1 from "../images/slider1.webp"
import slider2 from "../images/slider2.jpg"
import slider3 from "../images/slider3.webp"
import slider4 from "../images/slider4.webp"
import slider5 from "../images/slider5.jpg"
import hombreCorriendo from "../images/hombre-corriendo.webp";
import mujerCorriendo from "../images/mujer-corriendo.webp";
import niñoCorriendo from "../images/niños_jugando.webp";
import {BsCreditCardFill, BsRepeat, BsTruck} from "react-icons/bs";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUser} from "../redux/slices/userSlice.js";
import {getAllProducts} from "../api/productsService.js";
import ProductSlider from "../components/ProductSlider.jsx";
import Loader from "../components/Loader.jsx";
export const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const sliderSettings = {
        dots : true,
        infinite: true,
        speed: 500,
        adaptiveHeight: false,
        fade:true,
        slidesToShow: 4,
        slidesToScroll:1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    }

    const promoImages = [
        slider1,
        slider2,
        slider3,
        slider4,
        slider5
    ]

    const filtrarPorCategoria = (productos, categoria) => {
        return productos?.filter((producto) => {
            return producto.categories.some(
                (cat) => cat.nombre.toLowerCase() === categoria.toLowerCase()
            );
        });
    };
    const productosHombres = filtrarPorCategoria(sortedProducts, "hombre");
    const productosMujeres = filtrarPorCategoria(sortedProducts, "mujer");
    const productosNinos = filtrarPorCategoria(sortedProducts, "niños");

    useEffect(() => {
        let isMounted = true; // Bandera para evitar actualizar estado desmontado
        const fetchProducts = async () => {
            try {
                const res = await getAllProducts();
                if (isMounted && Array.isArray(res?.response)) {
                    setProducts(res.response);
                }
            } catch (e) {
                console.error("Error:", e);
            }
            finally {
                setIsLoading(false)
            }
        };
        fetchProducts();
        return () => { isMounted = false }; // Cleanup al desmontar
    }, []);
    useEffect(() => {
        console.log(products)
        if (products.length > 0) {
            const sorted = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setSortedProducts(sorted);
            console.log(sortedProducts);
        }
    }, [products]);



// En el return:
    if (isLoading) return <Loader/>;
    return(

        <div className={"home-container"}>
            <section className={"promo-slider"}>
                <Slider autoplay={true} arrows={false}>
                    {promoImages.map((img,index)=> (
                        <div key={index}>
                            <img
                                src = {img}
                                alt= {`promocion ${index+1}`}
                                className={"promo-image"}
                            />
                        </div>
                    ))}
                </Slider>
            </section>
            <section className={"newestSection"}>
                <h1>LO MAS NUEVO</h1>
                <ProductSlider products={sortedProducts.slice(0,8)}/>
            </section>
            <h2>Busqueda Por Categoria</h2>
            <section className={"menSection"}>
                <div className="imgMenSection">
                    <img src={hombreCorriendo} alt="sectionHombres" />
                    <h3>HOMBRES</h3>
                </div>
                <ProductSlider products={productosHombres.slice(0, 8)} />
            </section>
            <section className={"womenSection"}>
                <ProductSlider products={productosMujeres.slice(0, 8)} />
                <div className="imgWomenSection">
                    <img src={mujerCorriendo} alt="sectionMujer" />
                    <h3>MUJER</h3>
                </div>
            </section>
            <section className={"childrenSection"}>
                <div className="childrenSectionimg">
                    <img src={niñoCorriendo} alt="sectionNiños" />
                    <h3>NIÑOS</h3>
                </div>
                <ProductSlider products={productosNinos.slice(0, 8)} />
            </section>
            <section className={"bottomLabelsSection"}>
                <div className={"circleAd"}>
                    <BsCreditCardFill></BsCreditCardFill>
                    <span>Cuotas y formas de pago: </span>
                    <span>3 cuotas sin interes y 6 cuotas sin interes</span>
                </div>
                <div className={"circleAd"}>
                    <BsTruck></BsTruck>
                    <span>Envios gratis a todo el pais</span>
                    <span>Envios gratis a partir de 80$</span>
                </div>
                <div className={"circleAd"}>
                    <BsRepeat></BsRepeat>
                    <span>Cambios y devoluciones</span>
                    <span>Para cambios y devoluciones ir a Contacto</span>
                </div>
            </section>
        </div>
    )
}