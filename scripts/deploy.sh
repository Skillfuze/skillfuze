#!/bin/bash

CHANGED="$(npx lerna changed -a)"
npx lerna version --conventional-commits --yes

if [[ $CHANGED =~ "@skillfuze/backend" ]]
then
  PACKAGE_VERSION=$(node -pe "require('./packages/backend/package.json').version")
  echo "@skillfuze/backend bumped to v$PACKAGE_VERSION, deploying.."

  docker login --username=$DOCKER_HUB_USERNAME --pasword=$DOCKER_HUB_PASSWORD
  docker build --target skillfuze-backend -t skillfuze-backend .
  docker tag skillfuze-backend khaled-hamam/skillfuze-backend:latest
  docker tag skillfuze-backend khaled-hamam/skillfuze-backend:$PACKAGE_VERSION
  docker push khaled-hamam/skillfuze-backend

  ssh $EC2_USER@$EC2_HOST '
    docker pull khaledhamam/skillfuze-backend
    docker stop skillfuze-backend
    docker rm skillfuze-backend
    docker run --name skillfuze-backend --env-file ./.env.backend -d --restart on-failure skillfuze-backend
  '

  echo "@skillfuze/backend deployed.."
else
  echo "@skillfuze/backend has not changed, will not deploy.."
fi

if [[ $CHANGED =~ "@skillfuze/web-client" ]]
then
  PACKAGE_VERSION=$(node -pe "require('./packages/web-client/package.json').version")
  echo "@skillfuze/web-client bumped to v$PACKAGE_VERSION, deploying.."

  docker login --username=$DOCKER_HUB_USERNAME --pasword=$DOCKER_HUB_PASSWORD
  docker build --target skillfuze-web -t skillfuze-web .
  docker tag skillfuze-web khaled-hamam/skillfuze-web:latest
  docker tag skillfuze-web khaled-hamam/skillfuze-web:$PACKAGE_VERSION
  docker push khaled-hamam/skillfuze-web

  ssh $EC2_USER@$EC2_HOST '
    docker pull khaledhamam/skillfuze-web
    docker stop skillfuze-web
    docker rm skillfuze-web
    docker run --name skillfuze-web --env-file ./.env.web -d --restart on-failure skillfuze-web
  '

  echo "@skillfuze/web-client deployed.."
else
  echo "@skillfuze/web-client has not changed, will not deploy.."
fi
