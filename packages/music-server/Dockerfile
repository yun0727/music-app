FROM node:20-slim

# create app directory
WORKDIR /app

#Install app dependencies
COPY package.json .
RUN npm Install

#Bundle app source
COPY tsconfig.json ./
COPY src  ./src
COPY prisma ./prisma
COPY .env ./
COPY esbuild.js ./
COPY public ./public/

#prisma generate
RUN npx prisma generate

#Build
RUN npm run build

#start
CMD [ "npm", "start" ]

# expose port
EXPOSE 4000