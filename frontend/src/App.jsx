import { useState, useEffect } from 'react';


async function api(url, metodo = 'GET', datos) {
  const res = await fetch('/api/' + url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: datos ? JSON.stringify(datos) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Error');
  return json;
}


function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function enviar(e) {
    e.preventDefault();
    try {
      const datos = await api('login', 'POST', { usuario, password });
      onLogin(datos.usuario);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={enviar}>
      <h1>Iniciar sesión</h1>
      <p>
        <input placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
      </p>
      <p>
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      </p>
      <button>Entrar</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}


function Productos({ usuario, onLogout }) {
  const [lista, setLista] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState('');

  async function cargar() {
    setLista(await api('productos'));
  }

  useEffect(() => {
    cargar();
  }, []);

  async function guardar(e) {
    e.preventDefault();
    setError('');
    try {
      if (editando) await api('productos/' + editando, 'PUT', { nombre, precio });
      else await api('productos', 'POST', { nombre, precio });
      limpiar();
      cargar();
    } catch (err) {
      setError(err.message);
    }
  }

  function editar(p) {
    setEditando(p.id);
    setNombre(p.nombre);
    setPrecio(p.precio);
  }

  async function eliminar(id) {
    if (!window.confirm('¿Eliminar este producto?')) return;
    await api('productos/' + id, 'DELETE');
    cargar();
  }

  function limpiar() {
    setEditando(null);
    setNombre('');
    setPrecio('');
  }

  async function salir() {
    await api('logout', 'POST');
    onLogout();
  }

  return (
    <div>
      <h1>Productos</h1>
      <p>
        Sesión: <b>{usuario}</b> <button onClick={salir}>Cerrar sesión</button>
      </p>

      <form onSubmit={guardar}>
        <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />{' '}
        <input type="number" step="0.01" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />{' '}
        <button>{editando ? 'Actualizar' : 'Crear'}</button>
        {editando && <button type="button" onClick={limpiar}>Cancelar</button>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <table border="1" cellPadding="6" style={{ marginTop: 16 }}>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {lista.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>
                <button onClick={() => editar(p)}>Editar</button>{' '}
                <button onClick={() => eliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  
  useEffect(() => {
    api('me')
      .then((d) => setUsuario(d.usuario))
      .catch(() => {})
      .finally(() => setCargando(false));
  }, []);

  if (cargando) return <p>Cargando...</p>;
  if (!usuario) return <Login onLogin={setUsuario} />;
  return <Productos usuario={usuario} onLogout={() => setUsuario(null)} />;
}