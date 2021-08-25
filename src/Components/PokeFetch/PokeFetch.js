import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      countdown: 10,
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      .then(
        this.myInterval = setInterval(() => {
          this.setState({
            countdown: this.state.countdown - 1
          })
          if (this.state.countdown <= 0) {
            clearInterval(this.myInterval);
            this.setState({
              countdown: 0
            })
          }
        }, 1000)    
      )
      .catch((err) => console.log(err))
  }

  // decrementCount() {
  //   this.myInterval = setInterval(() => {
  //     this.setState({
  //       countdown: this.state.countdown - 1
  //     })
  //     if (this.state.countdown <= 0) {
  //       clearInterval(this.myInterval);
  //       this.setState({
  //         countdown: 0
  //       })
  //     }
  //   }, 1000)
  // }

  resetCount() {
    if (this.state.countdown === 0) {
      this.setState({
        countdown: 10
      })
    }
  }

  render() {
    // console.log(this.state);
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => {
          this.fetchPokemon();
          // this.decrementCount();
          this.resetCount();
        }}>Start!</button>
        <h1 className={'timer'} >Timer: {this.state.countdown}</h1>
        {(this.state.countdown) !== 0
          ? <div className={'pokeWrap'}>
            <img className={'pokeImg'} src={this.state.pokeSprite} />
          </div>
          :
          <div className={'pokeWrap'}>
            <img className={'pokeImgFinal'} src={this.state.pokeSprite} />
            <h1 className={'pokeName'}>{this.state.pokeName}</h1>
          </div>
        }
      </div>
    )
  }
}

export default PokeFetch;