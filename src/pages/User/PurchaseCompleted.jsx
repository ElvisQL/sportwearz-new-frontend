import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleFilled, SmileOutlined } from "@ant-design/icons";
import { Result, Typography } from "antd";

const { Title, Text } = Typography;

const PurchaseCompleted = ({ username }) => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirigir al home después de 5 segundos
        const timer = setTimeout(() => {
            navigate("/");
        }, 5000);

        // Limpiar el timer al desmontar el componente
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f0f2f5",
            }}
        >
            <Result
                status="success"
                icon={<CheckCircleFilled style={{ fontSize: "64px", color: "#52c41a" }} />}
                title={
                    <Title level={2} style={{ marginTop: "16px" }}>
                        ¡Compra finalizada con éxito!
                    </Title>
                }
                subTitle={
                    <Text type="secondary" style={{ fontSize: "16px" }}>
                        Gracias por tu compra, {username}. <SmileOutlined />
                    </Text>
                }
                extra={
                    <Text type="secondary" style={{ fontSize: "14px" }}>
                        Serás redirigido al inicio en unos segundos...
                    </Text>
                }
            />
        </div>
    );
};

export default PurchaseCompleted;