import React from 'react';
import { Route } from 'react-router-dom';
import LoadingIcon from './loading_icon';

class SongsIndex extends Component {
  componentDidMount() {
    this.props.requestAllPokemon();
  }

  render() {
    const { pokemon, loading } = this.props;
    return (
      loading ?
      <LoadingIcon /> :
      <section className="pokedex">
        <ul>
          {pokemon.map(poke => <PokemonIndexItem key={poke.id} pokemon={poke} />)}
        </ul>

        <Route exact path="/" component={PokemonFormContainer} />
        <Route path="/pokemon/:pokemonId" component={PokemonDetailContainer} />
      </section>
    );
  }
}

export default PokemonIndex;
