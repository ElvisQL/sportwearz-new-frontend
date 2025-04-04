import { BsBellFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { Button, Menu ,Dropdown} from "antd";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import {useDispatch} from "react-redux";
import {logout} from "../../../redux/slices/userSlice.js";
import {useNavigate} from "react-router-dom";
import {IoIosLogOut, IoMdPerson} from "react-icons/io";
import {FaStar} from "react-icons/fa";

export const HeaderDashboard = ({ collapsed, handleToggleMenu }) => {

    const navigate = useNavigate();
    const onMenuClick = ({ key }) => {
        if (key === "logout") {
            navigate("/login")
        }
        if (key === "fav") {
            navigate("/favoritos"); // Navegar a la página de favoritos si es necesario
        }
    };

    const itemsHeaderUserMenu = [
        {
            key:'user',

            icon: <IoMdPerson/>,
            children: [

                {
                    key:"logout",
                    label: "Cerrar Sesion",
                    icon: <IoIosLogOut />,
                }
            ]
        }
    ]


    return (
        <>
            <Button
                type="text"
                icon={collapsed ? <RiMenuUnfoldFill /> : <RiMenuFoldFill />}
                onClick={handleToggleMenu}
            ></Button>
            <span>Dashboard</span>
            <div className="icons-box">
                <BsBellFill></BsBellFill>
                <Menu

                    items={itemsHeaderUserMenu}
                    mode="vertical"
                    popupplacement="bottomRight"
                    onClick={onMenuClick}
                />
            </div>
        </>
    );
};
