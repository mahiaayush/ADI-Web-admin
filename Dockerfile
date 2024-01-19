FROM node:14-buster-slim As Stage1

# Load all the environment variables
ARG ENV_VARIABLES

ARG BUILD_ID
ENV BUILD_ID=$BUILD_ID

LABEL stage=Stage1
LABEL build=$BUILD_ID

ENV NODE_ENV=production \
    PROJECT_HOME=/usr/app/ \
    DEBUG="app:*" \
    BUILD_DEPS="git python build-essential"

# More node size for the docker build
ENV NODE_OPTIONS=--max_old_space_size=5120

# create project home
RUN mkdir -p ${PROJECT_HOME}

# switch to working directory
WORKDIR ${PROJECT_HOME}


# For all the items in the build argument create a custom .env file
#RUN IFS=';'; \
#    for item in $ENV_VARIABLES; do \
#    echo $item >> "${PROJECT_HOME}/.env"; \
#    done;

# RUN echo "${PROJECT_HOME}/.env"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ${PROJECT_HOME}

# install deps
RUN apt-get update > /dev/null \
    && apt-get install -y -qq --no-install-recommends ${BUILD_DEPS} \
    vim curl > /dev/null

# npm install
RUN npm i -g npm@6 \
    && npm install --quiet

# copy source code and run the build
COPY . $PROJECT_HOME

# Exporting to the environment before build rather than using .env file
RUN IFS=';'; \
    for item in $ENV_VARIABLES; do \
#    echo $item; \
    export $item; \
    done \
    && npm run build

# RUN npm run build

#Stage 2
#######################################
FROM public.ecr.aws/w5i2y4u3/devclever-india/lyc/nginx:latest

ENV NODE_ENV=production \
    PROJECT_HOME=/usr/app

# switch to project home directory
WORKDIR $PROJECT_HOME

# clear the available sites
RUN rm /etc/nginx/conf.d/* \
    && mkdir -p ${PROJECT_HOME}/build/

# copy nginx file
COPY --from=Stage1 $PROJECT_HOME/nginx/nginx.conf /etc/nginx/conf.d/
COPY --from=Stage1 $PROJECT_HOME/nginx/basic.conf /etc/nginx/conf.d/

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

# test nginx config
RUN nginx -t

# copy required files from the intermediate stage
COPY --from=Stage1 $PROJECT_HOME/build ./build

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
