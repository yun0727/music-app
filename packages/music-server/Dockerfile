FROM node:20-slim
RUN apt-get update -y && apt-get install -y openssl

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

# Create startup script
RUN echo '#!/bin/sh\nnpx prisma migrate deploy\nnpx prisma generate\nnpm start' > /app/start.sh
RUN chmod +x /app/start.sh

#start
CMD ["/app/start.sh"]

# expose port
EXPOSE 4000