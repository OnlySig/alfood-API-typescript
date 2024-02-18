import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminRestaurantes from './paginas/admin/AdminRestaurantes';
import FormAddRestaurante from './paginas/admin/FormAddRestaurante';
import HomeAdmin from './paginas/admin/HomeAdmin';
import AdminPratos from './paginas/admin/AdminPratos';
import FormPrato from './paginas/admin/FormPrato';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin' element={<HomeAdmin/>}>
        <Route path="restaurantes" element={<AdminRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormAddRestaurante />} />
        <Route path="restaurantes/:id" element={<FormAddRestaurante />} />
        <Route path="pratos" element={<AdminPratos />} />
        <Route path="pratos/novo" element={<FormPrato />} />
        <Route path="pratos/:id" element={<FormPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
