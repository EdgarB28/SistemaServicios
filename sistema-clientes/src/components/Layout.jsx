import { useState } from "react";
import Clientes from "../pages/Clientes";
import Bienvenido from "../pages/Bienvenido";
import "../styles/sidebar.css";

function Layout() {
    const [vista, setVista] = useState("inicio");

    const renderVista = () => {
        switch (vista) {
            case "inicio":
                return <Bienvenido/>;
            case "clientes":
                return <Clientes/>;
            case "productos":
                return <h2>Productos (en construcción)</h2>;
            case "ventas":
                return <h2>Ventas (en construcción)</h2>;
            default:
                return <h2>Bienvenido</h2>;
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* Sidebar */}
            <div style={{
                width: "150px",
                background: "#2c3e50",
                color: "white",
                padding: "20px"
            }}>
                <h3
                    onClick={() => setVista("inicio")}
                    style={{ cursor: "pointer" }}
                >
                    Menú
                </h3>

                <button
                    className="sidebar-button"
                    onClick={() => setVista("clientes")}
                >
                    Clientes
                </button>
                <br /><br /> 

                <button className="sidebar-button" onClick={() => setVista("productos")}>Productos</button>
                <br /><br />

                <button className="sidebar-button" onClick={() => setVista("ventas")}>Ventas</button>
            </div>

            {/* Contenido */}
            <div style={{ flex: 1, padding: "20px" }}>
                {renderVista()}
            </div>

        </div>
    );
}

export default Layout;