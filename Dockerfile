# Use a imagem oficial do Node.js como base
FROM node:20

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e o package-lock.json para o container
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código para o diretório de trabalho
COPY . .

# Exponha a porta em que o Nest.js irá rodar
EXPOSE 3000

# Comando para iniciar o servidor em modo de desenvolvimento
CMD ["npm", "run", "start:dev"]