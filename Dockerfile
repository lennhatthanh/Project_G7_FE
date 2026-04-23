FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy toàn bộ code vào
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
