import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminRestaurantes from './paginas/admin/AdminRestaurantes';
import FormAddRestaurante from './paginas/admin/FormAddRestaurante';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdminRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormAddRestaurante />} />
      <Route path="/admin/restaurantes/:id" element={<FormAddRestaurante />} />
    </Routes>
  );
}

export default App;
