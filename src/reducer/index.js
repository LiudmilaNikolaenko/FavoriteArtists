import {combineReducers} from 'redux';
import favorites from './favorites';
import artists from './artists';
import events from './events';

export default combineReducers({
  favorites, artists, events
});