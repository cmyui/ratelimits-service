FROM node:18

RUN mkdir -p /srv/root
WORKDIR /srv/root

COPY package.json yarn.lock /srv/root/
RUN yarn install
COPY . /srv/root
RUN yarn build

EXPOSE 80

ENTRYPOINT [ "/srv/root/entrypoint.sh" ]
