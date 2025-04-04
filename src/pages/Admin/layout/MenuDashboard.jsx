import brand from "../../../images/logo.png";
import { BiSolidDashboard, BiSolidCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { IoMdEye } from "react-icons/io";
import { BsBagFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { Collapse, Menu, Divider } from "antd";
import { MdOutlineEdit, MdOutlineAdd, MdLabel } from "react-icons/md";
import { RiCoupon3Fill } from "react-icons/ri";
import {publicRoutes} from "../../../routes/routes.js";
export const MenuDashBoard = () => {
    const getItem = (label, key, icon, children) => {
        return { key, label, icon, children };
    };

    const items = [
        getItem(
            <Link to={"/admin"}>Dashboard</Link>,
            "1",
            <BiSolidDashboard />,
            null
        ),
        getItem("Categories", "sub1", <BiSolidCategory />, [
            getItem(
                <Link to={"/admin/categories/add"}>Add Categories</Link>,
                "2",
                <MdOutlineAdd />,
                null
            ),
            getItem(
                <Link to={"/admin/categories/edit"}>Edit Categories</Link>,
                "3",
                <MdOutlineEdit />,
                null
            ),
        ]),
        getItem("Brands", "sub2", <MdLabel />, [
            getItem(
                <Link to={"/admin/brands/add"}>Add Brands</Link>,
                "5",
                <MdOutlineAdd />,
                null
            ),
            getItem(
                <Link to={"/admin/brands/edit"}>Edit Brands</Link>,
                "6",
                <MdOutlineEdit />,
                null
            ),
        ]),
        getItem("Users", "sub3", <FaUsers />, [
            getItem(
                <Link to={"/admin/users/read"}>See Users</Link>,
                "5",
                <IoMdEye />,
                null
            ),
        ]),
        getItem("Products", "sub4", <GiClothes />, [
            getItem(
                <Link to={"/admin/products/add"}>Add Products</Link>,
                "8",
                <MdOutlineAdd />,
                null
            ),
            getItem(
                <Link to={"/admin/products/edit"}>Edit Products</Link>,
                "9",
                <MdOutlineEdit />,
                null
            ),
        ]),
        getItem("Orders", "sub5", <BsBagFill />, [
            getItem(
                <Link to={"/admin/orders/read"}>Ver Ordenes</Link>,
                "11",
                <IoMdEye />,
                null
            ),
            getItem(
                <Link to={"/admin/cart/edit"}>Edit Orders</Link>,
                "12",
                <MdOutlineEdit />,
                null
            ),
        ]),
        getItem("Coupons", "sub6", <RiCoupon3Fill />, [
            getItem(
                <Link to={"/admin/coupons/add"}>Add Coupons</Link>,
                "14",
                <MdOutlineAdd />,
                null
            ),
            getItem(
                <Link to={"/admin/coupons/edit"}>Edit Coupons</Link>,
                "15",
                <MdOutlineEdit />,
                null
            ),
        ]),
    ];

    return (
        <>
            <div className="brand-container">
                <Link to={publicRoutes.HOME}>
                    <img src={brand} alt="logo" />
                </Link>

            </div>
            <div className="menubox">
                <Divider orientation="left" plain={true} className="divider">
                    <span>Application</span>
                </Divider>
                <Menu className="menu-antd" mode="inline" theme="dark" items={items} />
            </div>
        </>
    );
};
