FROM node:22.17.0-alpine3.22

RUN mkdir /src

COPY package.json /src
WORKDIR /src
RUN npm install

# Add your source files
COPY . /src
CMD ["npm","start"]
