import React, { useState, useEffect } from 'react'; // <-- NUEVO: importar useEffect
import axios from 'axios';
import './App.css';

// --- CONFIGURACIÓN GLOBAL DE AXIOS ---
// <-- NUEVO: Le decimos a Axios que incluya las cookies en cada petición. Esencial para Sanctum.
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true; // <-- NUEVO: Le dice a Axios que use la cookie XSRF.

// <-- NUEVO: Definimos la URL base del backend para no repetirla.
const API_BASE_URL = 'http://localhost:8000';
function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(null);

  // <-- NUEVO: Hook que se ejecuta una sola vez cuando el componente se monta
  useEffect(() => {
    // Función para obtener la cookie CSRF del backend
    const getCsrfToken = async () => {
      try {
        console.log("Obteniendo token CSRF...");
        // Hacemos la petición a la ruta que Sanctum prepara para nosotros
        await axios.get(`${API_BASE_URL}/sanctum/csrf-cookie`);
        console.log("Token CSRF obtenido y cookie establecida.");
      } catch (error) {
        console.error("Error al obtener el token CSRF:", error);
      }
    };

    getCsrfToken(); // Llamamos a la función
  }, []); // El array vacío [] asegura que se ejecute solo una vez

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      // Usamos la URL base + la ruta específica
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email: email,
        password: password
      });
      setToken(response.data.access_token);
      setMessage('¡Login exitoso!');
      console.log('Token:', response.data.access_token);
    } catch (error) {
      console.error('Error en el login:', error.response);
      setMessage('Error en el login: ' + (error.response?.data?.message || 'Credenciales incorrectas'));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      // Usamos la URL base + la ruta específica
      const response = await axios.post(`${API_BASE_URL}/api/register`, {
        name: name,
        email: email,
        password: password
      });
      setMessage(response.data.message);
      console.log('Registro exitoso:', response.data);
    } catch (error) {
      console.error('Error en el registro:', error.response);
      let errorMsg = 'Error en el registro. ';
      if (error.response?.data?.errors) {
        errorMsg += Object.values(error.response.data.errors).flat().join(' ');
      } else if (error.response?.data?.message) {
        errorMsg += error.response.data.message;
      }
      setMessage(errorMsg);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test de Entorno: Login Dentista</h1>
        
        <div className="form-container">
          <form onSubmit={handleRegister}>
            <h2>Registrarse</h2>
            <input 
              type="text" 
              placeholder="Nombre" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Contraseña (mínimo 8 caracteres)" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit">Registrar</button>
          </form>

          <form onSubmit={handleLogin}>
            <h2>Iniciar Sesión</h2>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <button type="submit">Login</button>
          </form>
        </div>

        {message && <p className="message">{message}</p>}
        {token && <p className="token-display">Token Obtenido: {token.substring(0, 30)}...</p>}
      </header>
    </div>
  );
}

export default App;