import {createSelector} from 'reselect';

const artistsGetter = state => state.artists;
const eventsGetter = state => state.events;
const nameGetter = (state, props) => props.name;

export const artistSelectorFactory = () => createSelector(artistsGetter, nameGetter, (artists, name) => {
  return artists.get(name)
});

export const eventSelectorFactory = () => createSelector(eventsGetter, nameGetter, (events, name) => {
  return events.get(name)
});