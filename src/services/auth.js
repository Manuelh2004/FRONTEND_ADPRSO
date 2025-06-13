export const loginRequest = async (email, password) => {
  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json(); // Obtener la respuesta JSON

  // Validar status del backend (no solo el código HTTP)
  if (result.status !== 'success' || !result.data?.token) {
    throw new Error(result.message || 'Credenciales incorrectas');
  }

  return result.data.token; // Login exitoso, devolver token
};