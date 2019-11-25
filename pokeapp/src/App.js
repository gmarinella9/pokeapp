import React from 'react';
import './App.css';
import './custom-style.css'
import config from './config'

import ListContainer from './components/ListContainer'



class ListControl extends React.Component{
  // Componente que maneja el cambio entre paginas
  
  render(){
    return <div className="d-flex align-items-center justify-content-between" style={{width:'10em', height:'6em'}}>
     <svg onClick={()=>{this.props.handleOffset('previous')}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></svg>
      <h4 className='Text'>{this.props.offset}</h4>
      <svg onClick={() => {this.props.handleOffset('next')}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"/></svg>
    </div>
  }
}

export default class App extends React.Component {
  // Aplicacion principal

  constructor(props){
    super(props)
    this.state = {
      offset:0,
      data:[],
      pokeapi:`${config.endpoint}/pokemon/?offset=0&limit=5`,
      language:'en'
    }

    // Primera carga para listado de pokemones
    this.fetchPokemon(this.state.pokeapi)
  }
  fetchSprite = (pokemons) => {
    // Metodo encargado de unificar los nombres con los sprites.

    let cache_data = []
    pokemons.map(poke => {
      fetch(poke.url)
      .then(data => {
        return data.json()
      })
      .then(j => {
        poke.sprite = j.sprites.front_default
        cache_data.push(poke)
        this.setState({data:cache_data})
      })
      return cache_data
    })
    
  }

  fetchPokemon = (pokeapi) => {
    // Metodo encargado de tomar el listado de pokemones con un offset de 5 por pagina

    fetch(pokeapi)
    .then(data => {
      return data.json()
    })
    .then(j => {
      this.setState({limit:j.count})
      this.setState({next:j.next})
      this.setState({previous:j.previous})
      this.setState({current:pokeapi})
      this.fetchSprite(j.results)
    })
  }

  handleOffset = (evnt) => {
    // Controlador de paginacion. La propia API integra la posibilidad de ir saldanto entre paginas con sus atributos "next" y "previous"
    // Este metodo es un callback de "ListControl -> handleOffset()"

    const { offset, limit } = this.state // Tambien muesta el limite de pokemones que existen hasta ahora con el atributo "count"

    if(evnt === 'next'){
      if(offset*5 <= limit + 1 ){
        const n_offset = offset + 1
        this.fetchPokemon(this.state.next)
        this.setState({offset:n_offset})
      }
    } else if (evnt === 'previous') {
      if(offset*5 > 0){
        const n_offset = offset - 1
        this.fetchPokemon(this.state.previous)
        this.setState({offset:n_offset})
      }
    }
  }
  
  render(){
    return <div className="App shadow p-3 mb-5 rounded d-flex flex-column align-items-center justify-content-center" style={{width:'30em', height:'40em'}}>
      
      {this.state.data === [] ? "No data" : <ListContainer data={this.state.data} language={this.state.language}/>}
      <ListControl offset={this.state.offset} handleOffset={this.handleOffset} />
      
      <span onClick={()=>{
        // Seleccionador de idioma, disponible español e ingles.

        if(this.state.language === 'en'){
          this.setState({language:'es'})
        } else if (this.state.language === 'es') {
          this.setState({language:'en'})
        }
        this.fetchPokemon(this.state.current)
      }}
      className="badge badge-warning">{this.state.language.toUpperCase()}</span>
  </div>
  }
}