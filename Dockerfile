FROM node:20-alpine

RUN mkdir /src

COPY package.json /src
WORKDIR /src
RUN npm install

# Add your source files
COPY . /src
CMD ["npm","start"]
