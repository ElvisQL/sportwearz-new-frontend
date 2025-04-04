import { useState } from "react";
import { HeaderDashboard } from "./HeaderDashboard";
import { MenuDashBoard } from "./MenuDashboard";
import { Layout } from "antd";
import {Outlet} from "react-router-dom";
const { Header, Content, Sider } = Layout;

export const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const handleToggleMenu = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Layout className="layout-dashboard">
            <Sider
                collapsed={collapsed}
                collapsible
                trigger={null}
                width={"250"}
                className="menu"
            >
                <MenuDashBoard></MenuDashBoard>
            </Sider>

            <Layout className="section-body">
                <Header className="admin-header">
                    <HeaderDashboard
                        collapsed={collapsed}
                        handleToggleMenu={handleToggleMenu}
                    ></HeaderDashboard>
                </Header>
                <Content className="content-dash"><Outlet/></Content>
            </Layout>
        </Layout>
    );
};
