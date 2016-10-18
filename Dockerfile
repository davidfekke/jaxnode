FROM node:6.9.0

RUN curl -o- -L https://yarnpkg.com/install.sh | bash
ENV PATH="/root/.yarn/bin:$PATH"

RUN mkdir /src

COPY package.json /src
WORKDIR /src 
RUN yarn

# Add your source files
COPY . /src  
# CMD ["npm","start"] 
