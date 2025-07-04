import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} ParkinInterger - Sistema de Gestión de Estacionamiento</p>
        <p className="text-sm text-gray-400 mt-2">Desarrollado con React y Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer; 