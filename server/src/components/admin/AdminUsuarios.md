# Componente AdminUsuarios

## Descripción
El componente `AdminUsuarios` es un panel de administración para gestionar usuarios del sistema de estacionamiento. Proporciona funcionalidades completas para visualizar, filtrar, activar/desactivar y eliminar usuarios.

## Funcionalidades Principales

### 1. Gestión de Usuarios
- Visualización de lista de usuarios
- Filtrado por rol (admin/user) y estado (activo/inactivo)
- Búsqueda por nombre o email
- Activación/desactivación de usuarios
- Eliminación de usuarios

### 2. Información de Usuario
- Nombre completo
- Email
- Rol (Administrador/Usuario)
- Estado (Activo/Inactivo)
- Fecha de registro
- Última sesión
- Tiempo de sesión activa

### 3. Características Técnicas
- Almacenamiento local usando localStorage
- Actualización automática del tiempo de sesión
- Filtrado y búsqueda en tiempo real
- Interfaz responsiva y moderna

## Estructura del Componente

### Estado
```javascript
const [usuarios, setUsuarios] = useState([]);
const [filtro, setFiltro] = useState('todos');
const [busqueda, setBusqueda] = useState('');
```

### Efectos
1. **Carga Inicial**
   - Carga usuarios desde localStorage
   - Inicializa con datos de ejemplo si no hay usuarios

2. **Actualización de Tiempo de Sesión**
   - Actualiza el tiempo de sesión cada minuto
   - Calcula tiempo activo para usuarios en sesión

### Funciones Principales

1. **formatearFechaCompleta(fecha)**
   - Formatea fechas en formato local español
   - Incluye día, mes, año, hora y minutos

2. **formatearTiempoSesion(minutos)**
   - Convierte minutos a formato legible (horas y minutos)
   - Ejemplo: "2h 30m"

3. **cambiarEstado(id)**
   - Alterna el estado de un usuario entre activo e inactivo
   - Actualiza localStorage

4. **eliminarUsuario(id)**
   - Elimina un usuario con confirmación
   - Actualiza localStorage

## Interfaz de Usuario

### Elementos Principales
1. **Barra de Búsqueda**
   - Filtrado por texto en nombre o email

2. **Selector de Filtro**
   - Opciones: Todos, Administradores, Usuarios, Activos, Inactivos

3. **Tarjetas de Usuario**
   - Información detallada de cada usuario
   - Indicadores visuales de estado y rol
   - Botones de acción (Activar/Desactivar, Eliminar)

### Estilos
- Utiliza Tailwind CSS para estilos
- Diseño responsivo
- Indicadores visuales de estado (colores)
- Animaciones y transiciones suaves

## Dependencias
- React Icons (FaUser, FaEnvelope, FaClock, etc.)
- LocalStorage para persistencia de datos
- Tailwind CSS para estilos

## Consideraciones de Seguridad
- Confirmación antes de eliminar usuarios
- Validación de acciones administrativas
- Persistencia segura de datos de usuario

## Mejoras Futuras
1. Integración con backend
2. Paginación de resultados
3. Exportación de datos
4. Historial de cambios
5. Roles más granulares 