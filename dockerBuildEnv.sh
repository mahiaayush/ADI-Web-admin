#!/usr/bin/env bash

# Set -E to stop if any command other than conditional command fails to execute
set -e

PushProfile=$1

# Cluster Name
ClusterName=$2

# ConfigMap Name
ConfigMap=$3

# ConfigMap File Name
#ConfigMapFile=configmap-web.yaml

if [[ -z "$1" ]]; then
    echo -e "\nPlease call '$0 <aws profile> <cluster name> <configmap name>' to create .env file from kubernetes!\n"
    echo -e "Example : ./dockerBuildEnv.sh akhilesh EKS-Cluster-DEVIN configmap-web\n"
    exit 1
fi

# update kubeconfig
aws eks update-kubeconfig --region ap-south-1  --name $ClusterName --profile $PushProfile

# fetch configmap in yaml format from cluster
#kubectl get configmaps $ConfigMap -o yaml > $ConfigMapFile

# install yq if not installed (https://mikefarah.gitbook.io/yq/)
# convert yaml to .env
#yq e '.data' $ConfigMapFile | sed 's/: /=/' > .env

# fetch configmap in json format from cluster
ConfigMapValues=$(kubectl get configmaps $ConfigMap -o json)

# Following taken from https://stackoverflow.com/a/48513046/2545888

# convert json to .env
echo $ConfigMapValues | jq .data | jq -r "to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]" > .env