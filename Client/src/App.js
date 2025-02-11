import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Register from './Pages/Register';
import PrivateRoutes from './Components/PrivateRoutes';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/privateRoutes" element={<PrivateRoutes />}>
        <Route path="Dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
