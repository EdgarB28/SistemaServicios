const API_URL = "http://localhost:8080/api/productos";

export const listarProductos = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export const crearProducto = async (producto) => {
  const response = await fetch("http://localhost:8080/api/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  const data = await response.json(); 

  if (!response.ok) {
    throw data; 
  }

  return data;
};

export const eliminarProducto = async (id) => {
  await fetch(`http://localhost:8080/api/productos/${id}`, {
    method: "DELETE",
  });
};

export const actualizarProducto = async (id, producto) => {
  const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  return await response.json();
};