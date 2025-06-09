# Componente Header

## Descripción
El componente `Header` es la barra de navegación principal de la aplicación ParkinInterger. Proporciona navegación, acceso a funcionalidades según el rol del usuario, y gestión de temas (claro/oscuro).

## Funcionalidades Principales

### 1. Navegación
- Menú principal con enlaces a secciones clave
- Navegación responsiva con menú hamburguesa
- Indicadores visuales de página activa
- Enlaces dinámicos según rol de usuario

### 2. Gestión de Usuario
- Visualización de información del usuario
- Botón de cierre de sesión
- Enlaces de login separados para usuarios y administradores
- Mostrar/ocultar elementos según autenticación

### 3. Personalización
- Toggle de tema claro/oscuro
- Diseño responsivo
- Estilos adaptativos

## Estructura del Componente

### Estado
```javascript
const [isMenuOpen, setIsMenuOpen] = useState(false);
```

### Hooks Utilizados
1. **useAuth**
   - Acceso a información de usuario
   - Funciones de autenticación
   - Verificación de roles

2. **useTheme**
   - Gestión del tema de la aplicación
   - Toggle entre modo claro/oscuro

3. **useLocation**
   - Detección de ruta actual
   - Resaltado de enlace activo

### Funciones Principales

1. **handleLogout()**
   - Cierra la sesión del usuario
   - Cierra el menú móvil

2. **isActive(path)**
   - Determina si una ruta está activa
   - Aplica clases CSS correspondientes

## Interfaz de Usuario

### Elementos Principales
1. **Logo y Marca**
   - Enlace a página principal
   - Nombre de la aplicación

2. **Menú de Navegación**
   - Enlaces comunes:
     - Inicio
     - Estacionamiento
     - Autolavado
   - Enlaces para usuarios autenticados:
     - Reservas
     - Historial
     - Facturación
   - Enlaces para administradores:
     - Gestionar Usuarios
     - Gestionar Servicios
     - Reportes

3. **Área de Usuario**
   - Información del usuario (nombre, email, rol)
   - Botón de cerrar sesión
   - Enlaces de login (usuario/admin)

4. **Control de Tema**
   - Botón de toggle tema claro/oscuro
   - Indicador visual del tema actual

### Estilos
- Utiliza clases de Tailwind CSS
- Diseño responsivo con menú hamburguesa
- Transiciones suaves
- Indicadores visuales de estado

## Dependencias
- React Router (Link, useLocation)
- Contextos personalizados (AuthContext, ThemeContext)
- Tailwind CSS para estilos

## Consideraciones de UX
- Navegación intuitiva
- Feedback visual de acciones
- Adaptabilidad a diferentes dispositivos
- Accesibilidad (aria-labels)

## Mejoras Futuras
1. Menú desplegable para perfil de usuario
2. Notificaciones
3. Búsqueda global
4. Personalización de tema avanzada
5. Soporte para múltiples idiomas 