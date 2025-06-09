# Etapa de desarrollo y producción
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Instala las dependencias del sistema necesarias
RUN apk add --no-cache python3 make g++

# Copia package.json y package-lock.json primero para aprovechar la caché de Docker
COPY package*.json ./

# Limpia la caché de npm y instala dependencias
RUN rm -rf node_modules && \
    npm cache clean --force && \
    npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto 3001 donde correrá la aplicación
EXPOSE 3001

# Variables de entorno para el servidor
ENV PORT=3001
ENV NODE_ENV=development
ENV VITE_HOST=0.0.0.0

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev", "--", "--host"]
