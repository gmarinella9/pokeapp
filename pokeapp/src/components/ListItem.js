import React from 'react'
import '../custom-style.css'
import config from '../config'


class Data extends React.Component {
    // Componente interno modal para mostrar los detalles del pokemon seleccionado de forma overscreen.

    constructor(props){
        super(props)
        this.state = {
            show:this.props.mostrar
        }
    }

    render(){
        // Modal simple
        return <div className="modal fade" id={"poke-detail-" + this.props.pokename}  role="dialog" aria-labelledby="poke-detailTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
            <div className="modal-header d-flex p-0 m-0 align-items-center justify-content-start">
                <img width='128' height='128' className='p-0 m-0 ml-3 mr-4' src={this.props.pokesprite} alt="sprite"></img>
                <h5 className="p-0 m-0 ml-5" id="poke-detailTitle">{this.props.pokename.toUpperCase()}</h5>
            </div>
            <div className="modal-body">
                {this.props.data && this.props.data.map(dt => {
                    if(this.props.language === 'en'){
                        return <div key={this.props.pokename + dt.en.name}>
                            <strong>{dt.en.name}</strong>
                            <p>{dt.en.flavor}</p>
                        </div>
                    } else if (this.props.language === 'es') {
                        return <div key={this.props.pokename + dt.es.name}>
                        <strong>{dt.es.name}</strong>
                        <p>{dt.es.flavor}</p>
                    </div>
                    }
                    return 0
                })}
            </div>
         
            </div>
        </div>
        </div>
    }
}


export default class ListItem extends React.Component {
    // Componente Item, se contiene en el componente ListContainer. Lleva la informacion del nombre y el sprite del pokemon.
    constructor(props){
        super(props)

        this.state = {
            modal:[],
            modal_name:'',
            modal_sprite:'',
            habilidades:[],
            show:0
        }
        
    }

    fetchAbilities = (pokedata) => {
        // Filtrar lenguage de las habilidades

        const ability_list = []
        
        pokedata.abilities.map(
            elemnt => 
            fetch(elemnt.ability.url)
            .then(data => {
                return data.json()
            })
            .then(abilitydata => {
                    const ability_details = {es:{name:'',flavor:''},en:{name:'',flavor:''}}
                    abilitydata.names.forEach(e => {
                        if(e.language.name === 'es'){
                            ability_details.es.name = e.name
                        } 
                        else if (e.language.name === 'en') {
                            ability_details.en.name = e.name
                        }
                    })
                    abilitydata.flavor_text_entries.forEach(
                        e => {
                            if(e.language.name === 'es'){
                                ability_details.es.flavor = e.flavor_text
                            } else if(e.language.name === 'en'){
                                ability_details.en.flavor = e.flavor_text
                            }
                        }
                    )


                    ability_list.push(ability_details)
                    this.setState({show:1, modal:ability_list})
                    
                })
        )
     
    } 

    fetchPokemonData = (pokemon) => {
        // Recuperar inforacion relevante del pokemon

        fetch(`${config.endpoint}/pokemon/${pokemon}`)
        .then(data => {
            return data.json()
        })
        .then(pokedata => {
           this.fetchAbilities(pokedata)

        })
    }

    render(){

        
        return <div onClick={() => {
            this.fetchPokemonData(this.props.pokename)
        }} data-toggle={'modal'} data-target={"#poke-detail-" + this.props.pokename} className="rounded shadow-sm mb-4 d-flex align-items-center justify-content-arround Item" >
            <img className='ml-3 mr-4' src={this.props.pokesprite} width='64' height='64' alt="sprite"></img>
            <h5 className='Text'>{this.props.pokename.toUpperCase()}</h5>
            <Data mostrar={this.state.show} pokename={this.props.pokename} pokesprite={this.props.pokesprite} data={this.state.modal} language={this.props.language}/>
            
            
        </div>
        
    }
  }