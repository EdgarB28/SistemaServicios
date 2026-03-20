const API_URL = "http://localhost:8080/api/clientes";

export const listarClientes = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

export const crearCliente = async (cliente) => {
  const response = await fetch("http://localhost:8080/api/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });

  return await response.json();
};