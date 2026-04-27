import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Bienvenido from "./pages/Bienvenido";
import Clientes from "./pages/Clientes";
import Productos from "./pages/Productos";
import Ventas from "./pages/Ventas";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Bienvenido />} />
                <Route path="clientes" element={<Clientes />} />
                <Route path="productos" element={<Productos filtroEstado="todos" />} />
                <Route path="productos/activos" element={<Productos filtroEstado="activos" />} />
                <Route path="productos/eliminados" element={<Productos filtroEstado="eliminados" />} />
                <Route path="ventas" element={<Ventas />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
}

export default App;
