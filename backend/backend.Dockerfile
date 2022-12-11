FROM node:18-alpine As development

# Create app directory
WORKDIR /usr/src/app

COPY '/backend/package.json' ./
COPY '/backend/package-lock.json' ./
COPY '/backend/tsconfig.json' ./

RUN npm ci

# Bundle app source
COPY . .

CMD [ "npm", "start" ]