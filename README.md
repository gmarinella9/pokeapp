## Construir imagen Docker:

Seguir las siguientes lineas de comando para construir imagen:

`git clone https://github.com/gmarinella9/pokeapp.git`

`cd pokeapp`

`docker build -t "pokeapp" .`


## Ejecutar Demo:

`docker run -d -p 10300:3000 pokeapp`

Abrir [http://localhost:10300](http://localhost:10300) para acceder a Pokeapp.


## Iniciar modo desarrollo con docker:

Siempre dentro del repositorio, cada modificación realizada se verá reflejada en el navegador en tiempo real

`docker run -d -v $PWD/pokeapp/src:/opt/pokedex/src -v $PWD/pokeapp/public:/opt/pokedex/public -p 10301:3000 pokeapp`

Abrir [http://localhost:10301](http://localhost:10301) para acceder a Pokeapp.
