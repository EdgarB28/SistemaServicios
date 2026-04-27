import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../styles/sidebar.css";

function Layout() {
    const location = useLocation();
    const esRutaProductos = location.pathname.startsWith("/productos");
    const [mostrarSubmenuProductos, setMostrarSubmenuProductos] = useState(esRutaProductos);

    useEffect(() => {
        if (esRutaProductos) {
            setMostrarSubmenuProductos(true);
        }
    }, [esRutaProductos]);

    const obtenerClaseLink = ({ isActive }) =>
        `sidebar-button ${isActive ? "sidebar-button-active" : ""}`;

    const obtenerClaseSubmenu = ({ isActive }) =>
        `sidebar-submenu-button ${isActive ? "sidebar-button-active" : ""}`;

    return (
        <div className="app-layout">
            <aside className="sidebar">
                <NavLink to="/" end className="sidebar-title">
                    Menu
                </NavLink>

                <NavLink to="/clientes" className={obtenerClaseLink}>
                    Clientes
                </NavLink>

                <button
                    type="button"
                    className={`sidebar-button ${esRutaProductos ? "sidebar-button-active" : ""}`}
                    onClick={() => setMostrarSubmenuProductos((valorActual) => !valorActual)}
                >
                    <span>Productos</span>
                    <span>{mostrarSubmenuProductos ? "-" : "+"}</span>
                </button>

                {mostrarSubmenuProductos && (
                    <div className="sidebar-submenu">
                        <NavLink to="/productos" end className={obtenerClaseSubmenu}>
                            Todos
                        </NavLink>
                        <NavLink to="/productos/activos" className={obtenerClaseSubmenu}>
                            Activos
                        </NavLink>
                        <NavLink to="/productos/eliminados" className={obtenerClaseSubmenu}>
                            Eliminados
                        </NavLink>
                    </div>
                )}

                <NavLink to="/ventas" className={obtenerClaseLink}>
                    Ventas
                </NavLink>
            </aside>

            <main className="layout-content">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
