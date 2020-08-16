#!/bin/bash

read -p 'Backend Image Tag: ' BACKEND_TAG
kubectl set image deployment/sf-backend-dep sf-backend=khaledhamam/skillfuze-backend:$BACKEND_TAG --record
kubectl rollout status deployments/sf-backend-dep

read -p 'Web-Client Image Tag: ' WEB_TAG
kubectl set image deployment/sf-web-dep sf-web=khaledhamam/skillfuze-web:$WEB_TAG --record
kubectl rollout status deployments/sf-web-dep
