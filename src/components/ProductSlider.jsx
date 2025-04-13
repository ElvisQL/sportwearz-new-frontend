import Slider from "react-slick";
import Card from "./Card";

const ProductSlider = ({ products }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: false,
                    variableWidth: false
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