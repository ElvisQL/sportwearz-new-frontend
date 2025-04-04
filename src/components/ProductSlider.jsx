import Slider from "react-slick";
import Card from "./Card"; // Importa tu componente Card

const ProductSlider = ({ products }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    return (
        <Slider {...sliderSettings}>
            {products.map((producto) => (
                <div key={producto.productId}>
                    <Card producto={producto} />
                </div>
            ))}
        </Slider>
    );
};

export default ProductSlider;