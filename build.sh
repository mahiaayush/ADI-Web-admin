#!/usr/bin/env bash

# Set -E to stop if any command other than conditional command fails to execute
set -e

# Name of the docker image
IMAGE=$1;

# Build ID for the intermediate images
BUILD_ID=`uuidgen`

echo $BUILD_ID

if [[ -z "$1" ]]; then
#    echo -e "\nPlease call '$0 <image>' to deploy this image!\n"
#    exit 1
     IMAGE="devclever-india/lyc/web-admin"
fi

ENVFILE=$2


if [[ -z "$2" ]]; then
#    echo -e "\nPlease call '$0 <image>' to deploy this image!\n"
#    exit 1
     ENVFILE=".env"
fi

## Creating an string of environment variables
envs=''

## Creating a concatenated string with ; as IFS delimiter to be used in docker
while IFS= read -r line; do
  envs+="$line;"
done < $ENVFILE;

# type of the image
DOCKER_FILE="Dockerfile"


if [[ "dev" == "$3" ]]; then
    DOCKER_FILE="Dockerfile-Dev"
fi

# Build the docker image
docker build \
    --tag \
    $IMAGE \
    --build-arg ENV_VARIABLES="${envs[*]}" \
    --build-arg BUILD_ID=$BUILD_ID \
    -f ${DOCKER_FILE} .

# Filter out and remove the intermediate build
docker image prune --force --filter label=stage=Stage1 --filter label=build=$BUILD_ID

