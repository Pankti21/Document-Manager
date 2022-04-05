FROM node:alpine

WORKDIR /usr/src/app

# frontend build starts
COPY frontend/package.json .

COPY frontend/package-lock.json .

RUN npm install

RUN npm run build

COPY frontend/build .

RUN rm -rf node_modules

RUN rm package.json

RUN rm package-lock.json

# frontend build end


# backend build starts
COPY backend/package.json .

COPY backend/package-lock.json .

RUN npm install

COPY backend .
# backend build end

EXPOSE 3001

CMD ["npm", "start"]