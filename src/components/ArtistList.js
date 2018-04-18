import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createArtistState} from '../AC';
import Artist from './Artist';

class ArtistList extends React.Component {
  static propTypes = {
    favorites: PropTypes.array,
    createArtistState: PropTypes.func
  };

  render() {
    const {favorites, createArtistState} = this.props;
    if (!favorites.length) return <p>No favorite artists.</p>
    return (
      <ul>
        {favorites.map( name => {
          createArtistState(name);
          return <li key = {name}><Artist name = {name} /></li>})}
      </ul>
    )
  };

};

export default connect((state) => ({
  favorites: state.favorites
}), {createArtistState})(ArtistList);