export const loginRequest = async (email, password) => {
  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json(); // leer la respuesta del backend

  if (result.status !== 'success' || !result.data?.token) {
    // 🚨 Lanzamos un error con estructura similar a Axios
    throw {
      response: {
        data: {
          message: result.message || 'Credenciales incorrectas'
        }
      }
    };
  }

  return result.data.token;
};
