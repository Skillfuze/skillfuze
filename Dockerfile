FROM node:lts-alpine AS skillfuze-base
WORKDIR /skillfuze
COPY . .
RUN yarn install --frozen-lockfile


FROM skillfuze-base AS skillfuze-web
EXPOSE 3001
WORKDIR /skillfuze/packages/ui-components
RUN yarn build
WORKDIR /skillfuze/packages/types
RUN yarn build
WORKDIR /skillfuze/packages/web-client
RUN yarn build
CMD ["yarn", "start", "-p", "3001"]


FROM skillfuze-base AS skillfuze-backend
RUN apk upgrade -U \
 && apk add ca-certificates ffmpeg libva-intel-driver \
 && rm -rf /var/cache/*
EXPOSE 3000 1935 8080
WORKDIR /skillfuze/packages/types
RUN yarn build
WORKDIR /skillfuze/packages/backend
RUN yarn build
CMD ["yarn", "start"]
