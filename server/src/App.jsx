import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Componentes de servicios
import Estacionamiento from './components/services/Estacionamiento';
import Autolavado from './components/services/Autolavado';
import Servicios from './components/services/Servicios';

// Componentes de cliente/usuario
import CustomerDashboard from './components/customer/CustomerDashboard';
import CustomerProfile from './components/customer/CustomerProfile';
import CustomerVehicles from './components/customer/CustomerVehicles';
import HistorialUnificado from './components/historial/HistorialUnificado';
import Reservas from './components/reservations/Reservas';
import Billing from './components/billing/Billing';

// Componentes de administrador
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsuarios from './components/admin/AdminUsuarios';
import AdminServicios from './components/admin/AdminServicios';
import AdminReportes from './components/admin/AdminReportes';

// Componentes de autenticación
import AdminLogin from './components/auth/AdminLogin';
import UserLogin from './components/auth/UserLogin';
import Registro from './components/auth/Registro';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app-container">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Servicios />} />
                <Route path="/estacionamiento" element={<Estacionamiento />} />
                <Route path="/autolavado" element={<Autolavado />} />
                <Route path="/login/admin" element={<AdminLogin />} />
                <Route path="/login/user" element={<UserLogin />} />
                <Route path="/registro" element={<Registro />} />

                {/* Rutas protegidas de cliente/usuario */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <CustomerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <CustomerProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/vehicles"
                  element={
                    <ProtectedRoute>
                      <CustomerVehicles />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/reservas"
                  element={
                    <ProtectedRoute>
                      <Reservas />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/historial"
                  element={
                    <ProtectedRoute>
                      <HistorialUnificado />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/billing"
                  element={
                    <ProtectedRoute>
                      <Billing />
                    </ProtectedRoute>
                  }
                />

                {/* Rutas protegidas de administrador */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/usuarios"
                  element={
                    <AdminRoute>
                      <AdminUsuarios />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/servicios"
                  element={
                    <AdminRoute>
                      <AdminServicios />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/reportes"
                  element={
                    <AdminRoute>
                      <AdminReportes />
                    </AdminRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
