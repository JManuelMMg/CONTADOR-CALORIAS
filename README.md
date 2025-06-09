# Contador de Calorías

Aplicación web para el seguimiento y control de calorías diarias.

## Descripción

Esta aplicación permite a los usuarios registrar y monitorear su consumo diario de calorías, ayudándoles a mantener un control sobre su alimentación y alcanzar sus objetivos de salud.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

- `client/`: Frontend de la aplicación
- `server/`: Backend API

## Requisitos Previos

- Node.js (versión recomendada: 18.x o superior)
- npm o yarn
- Docker (opcional, para desarrollo con contenedores)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/[tu-usuario]/contador-calorias.git
cd contador-calorias
```

2. Instalar dependencias:
```bash
# Instalar dependencias del servidor
cd server
npm install

# Instalar dependencias del cliente
cd ../client
npm install
```

## Desarrollo

Para ejecutar el proyecto en modo desarrollo:

1. Iniciar el servidor:
```bash
cd server
npm run dev
```

2. Iniciar el cliente:
```bash
cd client
npm run dev
```

Alternativamente, puedes usar Docker Compose:
```bash
docker-compose up
```

## Tecnologías Utilizadas

- Frontend: React.js
- Backend: Node.js
- Base de datos: MongoDB
- Docker para contenedorización

## Contribución

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
