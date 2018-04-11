export const CREATE_ARTIST_STATE = 'CREATE_ARTIST_STATE';
export const LOAD_ARTIST = 'LOAD_ARTIST';
export const ADD_ARTIST = 'ADD_ARTIST';
export const DELETE_ARTIST = 'DELETE_ARTIST';
export const LOAD_EVENTS = 'LOAD_EVENTS';
export const START = '_START';
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';

export function createArtistState(name) {
    return {
        type: CREATE_ARTIST_STATE,
        payload: { name },
    }
};

export function loadArtist(name) {
    return {
        type: LOAD_ARTIST,
        payload: { name },
        callAPI: `https://rest.bandsintown.com/artists/${encodeURIComponent(name)}?app_id=study`
    }
};

export function addArtist(name) {
    return {
        type: ADD_ARTIST,
        payload: { name },
    }
};

export function deleteArtist(name) {
    return {
        type: DELETE_ARTIST,
        payload: { name }
    }
};

export function loadEvents(name) {
    return {
        type: LOAD_EVENTS,
        payload: { name },
        callAPI: `https://rest.bandsintown.com/artists/${encodeURIComponent(name)}/events?app_id=study`
    }
};

