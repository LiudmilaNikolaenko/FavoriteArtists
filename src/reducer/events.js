import {Record, Map} from 'immutable';
import {CREATE_ARTIST_STATE, LOAD_EVENTS, START, SUCCESS, FAIL, DELETE_ARTIST} from '../AC';

const EventRecord = Record({
    id: null,
    artist_id: null,
    url: null,
    on_sale_datetime: null,
    datetime: null,
    description: null,
    venue: null,
    offers: null,
    lineup: null
});

const EventsStateRecord = Record({
    artistEvents: [],
    loading: false,
    loaded: false
});

const defaultEvents = new Map({});

export default (eventsState = defaultEvents, action) => {
    const {type, payload, response} = action;

    switch (type) {
        case CREATE_ARTIST_STATE:
            return new Map({})
                .set(payload.name, new EventsStateRecord())
                .merge(eventsState);

        case LOAD_EVENTS + START:
            return eventsState
                .setIn([payload.name, 'loading'], true);

        case LOAD_EVENTS + SUCCESS:
            return eventsState
                .setIn([payload.name, 'artistEvents'], response)
                .setIn([payload.name, 'loading'], false)
                .setIn([payload.name, 'loaded'], true);
        
        case LOAD_EVENTS + FAIL:
            return artistsState
                .setIn([payload.name, 'loading'], false);

        case DELETE_ARTIST:
            return eventsState.delete(payload.name);
    }

    return eventsState;
};