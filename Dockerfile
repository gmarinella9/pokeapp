FROM node


RUN mkdir -p /opt/pokedex

COPY pokeapp/. /opt/pokedex

RUN cd /opt/pokedex ; npm i 
CMD cd /opt/pokedex ; npm start

EXPOSE 3000

