#!/bin/bash

git config --global user.email "khal3d.mohamed@gmail.com"
git config --global user.name "Khaled Mohamed"

CHANGED="$(npx lerna changed -a)"
npx lerna version --conventional-commits --yes

if [[ $CHANGED =~ "@skillfuze/backend" ]]
then
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
    sudo docker run --name skillfuze-backend --network="host" --env-file ./.env.backend -d --restart on-failure khaledhamam/skillfuze-backend
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
    sudo docker run --name skillfuze-web -p 3001:3001 --env-file ./.env.web -d --restart on-failure khaledhamam/skillfuze-web
  '

  echo "@skillfuze/web-client deployed.."
else
  echo "@skillfuze/web-client has not changed, will not deploy.."
fi

if [[ $CHANGED =~ "@skillfuze/ui-components" ]]
then
  PACKAGE_VERSION=$(node -pe "require('./packages/ui-components/package.json').version")
  echo "@skillfuze/ui-components bumped to v$PACKAGE_VERSION, deploying.."
  curl -X POST -d {} https://api.netlify.com/build_hooks/5eb493289f63910cdfab3957
  echo "@skillfuze/ui-components deployed.."
else
  echo "@skillfuze/ui-components has not changed, will not deploy.."
fi


if [[ $CHANGED =~ "@skillfuze/blogs-client" ]]
then
  PACKAGE_VERSION=$(node -pe "require('./packages/blogs-client/package.json').version")
  echo "@skillfuze/blogs-client bumped to v$PACKAGE_VERSION, deploying.."
  curl -X POST -d {} https://api.netlify.com/build_hooks/5eb4887e1dedb35aa39adae3
  echo "@skillfuze/blogs-client deployed.."
else
  echo "@skillfuze/blogs-client has not changed, will not deploy.."
fi
