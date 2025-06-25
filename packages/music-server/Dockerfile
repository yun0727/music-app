FROM node:20-slim

# create app directory
WORKDIR /app

#Install app dependencies
COPY package.json .
RUN npm install

#Bundle app source
COPY . .

#prisma generate
RUN npx prisma generate

#Build
RUN npm run build

#start
CMD [ "npm", "start" ]

# expose port
EXPOSE 4000