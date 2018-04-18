import {Record, Map} from 'immutable';
import {CREATE_ARTIST_STATE, LOAD_ARTIST, DELETE_ARTIST,
  START, SUCCESS, FAIL} from '../AC';

const ArtistRecord = Record({
  id: null,
  name: null,
  url: null,
  image_url: null,
  thumb_url: null,
  facebook_page_url: null,
  mbid: null,
  tracker_count: 0,
  upcoming_event_count: 0,
});

const ArtistStateRecord = Record({
  artist: new ArtistRecord(),
  loading: false,
  loaded: false
});

const defaultArtists = new Map({});

export default (artistsState = defaultArtists, action) => {
  const {type, payload, response} = action;

  switch (type) {
    case CREATE_ARTIST_STATE:
      return new Map({})
        .set(payload.name, new ArtistStateRecord())
        .merge(artistsState);

    case LOAD_ARTIST + START:
      return artistsState
        .setIn([payload.name, 'loading'], true);

    case LOAD_ARTIST + SUCCESS:
      return artistsState
        .setIn([payload.name, 'artist'], new ArtistRecord(response))
        .setIn([payload.name, 'loading'], false)
        .setIn([payload.name, 'loaded'], true);

    case LOAD_ARTIST + FAIL:
      return artistsState
        .setIn([payload.name, 'loading'], false);
            
    case DELETE_ARTIST:
      return artistsState
        .delete(payload.name);

    default:
      return artistsState;
  }

};