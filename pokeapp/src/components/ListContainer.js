import React from 'react'

import ListItem from './ListItem'

export default class ListContainer extends React.Component {
    // Componente contenedo del Listado por Items de los pokemones
    
    render(){
        return <div className="bg-light rounded shadow-sm p-3 mb-3 d-flex flex-column align-items-center" style={{width:'100%', height:'30em'}}>
                {this.props.data.map(e => {
                    return <ListItem key={e.name} pokename={e.name} pokesprite={e.sprite} language={this.props.language}/>
                })}
        </div>
    
    }
  }