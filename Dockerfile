FROM node:20.10.0-alpine3.15

RUN mkdir /src

COPY package.json /src
WORKDIR /src
CMD ["npm","install"]

# Add your source files
COPY . /src
CMD ["npm","start"]
