import brand from "../images/logo.png";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";

const Footer = () => {
    return (
        <footer>
            <section className="newsletter">
                <div className="text-newsletter">
                    <h3>Newsletter</h3>
                    <p>
                        ¡Suscríbete a nuestro boletín de noticias y recibe contenido
                        exclusivo diseñado especialmente para los amantes del deporte.
                        Además, obténe un 15% de descuento en tu próxima compra al unirte a
                        nuestra lista de correo hoy mismo.
                    </p>
                </div>
                <form className="form-newsletter">
                    <input type="text" placeholder="Ingrese su Email" />
                    <button type="submit">Subscribirse</button>
                </form>
            </section>

            <section className="pie">
                <img src={brand} alt="logo-sportwearz" />

                <nav className="cont-informacion">
                    <div className="box-footer">
                        <h4>Nosotros</h4>
                        <ul>
                            <li>
                                <a href="">Terminos y condiciones</a>
                            </li>
                            <li>
                                <a href="">Como comprar</a>
                            </li>
                            <li>
                                <a href="">Sobre Nosotros</a>
                            </li>
                            <li>
                                <a href="">Sucursales</a>
                            </li>
                        </ul>
                    </div>

                    <div className="box-footer">
                        <h4>Informacion</h4>
                        <ul>
                            <li>
                                <a href="">Medios de pago</a>
                            </li>
                            <li>
                                <a href="">Preguentas frecuentes</a>
                            </li>
                            <li>
                                <a href="">Politicas de Cambio</a>
                            </li>
                            <li>
                                <a href="">Politicas de Envio</a>
                            </li>
                        </ul>
                    </div>

                    <div className="box-footer">
                        <h4>Seguinos en</h4>
                        <ul>
                            <li>
                                <a href="">
                                    <BsFacebook />
                                    <span>Facebook</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <BsInstagram />
                                    <span>Instagram</span>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <BsWhatsapp />
                                    <span>Whatsapp</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </section>

            <section className="copyright">
                <span>Todos los derechos Reservados | © SportWearz </span>
            </section>
        </footer>
    );
};

export default Footer;