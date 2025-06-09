# Componente Estacionamiento

## Descripción
El componente `Estacionamiento` es el núcleo del sistema de gestión de estacionamiento. Maneja el registro de entrada y salida de vehículos, control de espacios, cálculo de tarifas y generación de historial.

## Funcionalidades Principales

### 1. Gestión de Espacios
- Visualización de disponibilidad en tiempo real
- 10 espacios de estacionamiento
- Indicadores visuales de ocupación
- Actualización automática de estado

### 2. Registro de Vehículos
- Validación de placas (6 caracteres alfanuméricos)
- Registro de entrada con timestamp
- Registro de salida con cálculo de tarifa
- Historial de operaciones

### 3. Cálculo de Tarifas
- Tarifa por intervalos de 15 minutos
- Actualización en tiempo real
- Visualización de tarifa acumulada
- Precio base configurable

### 4. Persistencia de Datos
- Almacenamiento en localStorage
- Sincronización entre pestañas
- Carga inicial de datos guardados
- Backup automático de operaciones

## Estructura del Componente

### Estado
```javascript
const [placa, setPlaca] = useState('');
const [espacios, setEspacios] = useState(Array(10).fill(null));
const [historial, setHistorial] = useState([]);
const [vehiculos, setVehiculos] = useState([]);
const [tiempos, setTiempos] = useState({});
const [tarifas, setTarifas] = useState({});
```

### Constantes
```javascript
const TARIFA_POR_15MIN = 3.25;
```

### Efectos
1. **Carga Inicial**
   - Carga datos desde localStorage
   - Inicializa espacios si no hay datos
   - Configura listeners de storage

2. **Actualización de Tiempos**
   - Actualiza tiempos y tarifas cada segundo
   - Calcula tiempo transcurrido
   - Actualiza tarifas en tiempo real

### Funciones Principales

1. **calcularTarifa(tiempoMinutos)**
   - Calcula tarifa basada en intervalos de 15 minutos
   - Retorna valor formateado a 2 decimales

2. **validarPlaca(placa)**
   - Valida formato de placa (6 caracteres alfanuméricos)
   - Retorna booleano

3. **registrarEntrada(e)**
   - Procesa entrada de vehículo
   - Valida placa y disponibilidad
   - Actualiza estado y localStorage
   - Sincroniza entre pestañas

4. **registrarSalida(vehiculo)**
   - Procesa salida de vehículo
   - Calcula tiempo y tarifa
   - Actualiza historial
   - Libera espacio
   - Sincroniza cambios

## Interfaz de Usuario

### Elementos Principales
1. **Formulario de Registro**
   - Input para placa
   - Botón de registro
   - Validación en tiempo real

2. **Mapa de Espacios**
   - Grid de 5x2 espacios
   - Indicadores visuales de estado
   - Información de vehículo estacionado
   - Botón de salida

3. **Panel de Vehículos**
   - Lista de vehículos estacionados
   - Información detallada por vehículo
   - Tiempo y tarifa actual
   - Botón de salida

### Estilos
- Utiliza Tailwind CSS
- Diseño responsivo
- Efectos de hover y transiciones
- Indicadores de color para estado
- Diseño tipo "glass" con sombras

## Dependencias
- React
- localStorage API
- Tailwind CSS

## Consideraciones Técnicas
- Sincronización entre pestañas
- Persistencia de datos
- Cálculos en tiempo real
- Validación de entrada
- Manejo de errores

## Mejoras Futuras
1. Integración con backend
2. Sistema de reservas
3. Tipos de vehículos
4. Tarifas diferenciadas
5. Reportes detallados
6. Notificaciones
7. Integración con cámara para lectura de placas
8. Sistema de pagos en línea 