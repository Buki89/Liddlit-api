#!/bin/bash


echo What should the version be?
read VERSION

docker build -t buki89/lireddit:$VERSION .
docker push buki89/lireddit:$VERSION
ssh root@138.68.65.61 "docker pull buki89/lireddit:$VERSION && docker tag buki89/lireddit:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
