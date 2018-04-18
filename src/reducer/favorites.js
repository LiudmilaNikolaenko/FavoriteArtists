import {ADD_ARTIST, DELETE_ARTIST} from '../AC';
import {favorites as defaultFavorites} from '../data';

export default (favoritesState = defaultFavorites, action) => {
  const {type, payload} = action;

  switch (type) {
    case ADD_ARTIST:
      return favoritesState
        .concat(payload.name);

    case DELETE_ARTIST:
      return favoritesState
        .filter(name => name !== payload.name);

    default:
      return favoritesState;
  }

};