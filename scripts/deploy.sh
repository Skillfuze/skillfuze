#!/bin/bash

git config --global user.email "khal3d.mohamed@gmail.com"
git config --global user.name "Khaled Mohamed"

CHANGED="$(npx lerna changed -a)"
npx lerna version --conventional-commits --yes

if [[ $CHANGED =~ "@skillfuze/backend" ]]
then
  ssh $EC2_USER@$EC2_HOST `echo Hello World`
  PACKAGE_VERSION=$(node -pe "require('./packages/backend/package.json').version")
  echo "@skillfuze/backend bumped to v$PACKAGE_VERSION, deploying.."

  docker login --username=$DOCKER_HUB_USERNAME --password=$DOCKER_HUB_PASSWORD
  docker build --target skillfuze-backend -t skillfuze-backend .
  docker tag skillfuze-backend khaledhamam/skillfuze-backend:$PACKAGE_VERSION
  docker tag skillfuze-backend khaledhamam/skillfuze-backend:latest
  docker push khaledhamam/skillfuze-backend

  ssh $EC2_USER@$EC2_HOST '
    sudo docker pull khaledhamam/skillfuze-backend
    sudo docker stop skillfuze-backend
    sudo docker rm skillfuze-backend
    sudo docker run --name skillfuze-backend --env-file ./.env.backend -d --restart on-failure skillfuze-backend
  '

  echo "@skillfuze/backend deployed.."
else
  echo "@skillfuze/backend has not changed, will not deploy.."
fi

if [[ $CHANGED =~ "@skillfuze/web-client" ]]
then
  PACKAGE_VERSION=$(node -pe "require('./packages/web-client/package.json').version")
  echo "@skillfuze/web-client bumped to v$PACKAGE_VERSION, deploying.."

  docker login --username=$DOCKER_HUB_USERNAME --password=$DOCKER_HUB_PASSWORD
  docker build --target skillfuze-web -t skillfuze-web .
  docker tag skillfuze-web khaledhamam/skillfuze-web:$PACKAGE_VERSION
  docker tag skillfuze-web khaledhamam/skillfuze-web:latest
  docker push khaledhamam/skillfuze-web

  ssh -o StrictHostKeyChecking=no $EC2_USER@$EC2_HOST '
    sudo docker pull khaledhamam/skillfuze-web
    sudo docker stop skillfuze-web
    sudo docker rm skillfuze-web
    sudo docker run --name skillfuze-web --env-file ./.env.web -d --restart on-failure skillfuze-web
  '

  echo "@skillfuze/web-client deployed.."
else
  echo "@skillfuze/web-client has not changed, will not deploy.."
fi
