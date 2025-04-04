import {MoonLoader} from "react-spinners";
import loadingGif from "../images/loading-bar.gif"

const Loader = () => {
    return (

        <div className="loader">
            <h1>Cargando...</h1>
            <MoonLoader/>
        </div>

    )
}

export default Loader;