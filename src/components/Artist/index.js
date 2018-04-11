import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {artistSelectorFactory} from '../../selectors';
import {loadArtist, deleteArtist} from '../../AC';
import Loader from '../Loader';
import ArtistEvents from '../ArtistEvents';
import './artist.scss';

class Artist extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        artist: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            image_url: PropTypes.string,
            thumb_url: PropTypes.string,
            facebook_page_url: PropTypes.string,
            upcoming_event_count: PropTypes.number,
        }),
        loading: PropTypes.bool,
        loaded: PropTypes.bool,
        loadArtist: PropTypes.func,
        deleteArtist: PropTypes.func,
    };

    componentWillMount() {
        const {name, loading, loaded, loadArtist} = this.props;
        if (!loaded && !loading) loadArtist(name);
    }

    render() {
        const {name, artist, loading, loaded, deleteArtist} = this.props;
        if (loading) return <Loader />;
        if (!loaded) return null;
        if (!artist.id) {
            deleteArtist(name);
            return null;
        };
        const FacebookElement = artist.facebook_page_url ?
            <p> 
                <a href={artist.facebook_page_url} target="_blank"><i className="fa fa-facebook"></i></a> 
            </p> : null;
        const ArtistEventsElement = artist.upcoming_event_count ? 
            <ArtistEvents name = {name} /> : null;
        return (
            <div className = 'artist_wrapper' >
                <div className = 'artist'>
                    <div className = 'artist__image'>
                        <img src={artist.image_url} />
                    </div>
                    <div className = 'artist__info'>
                        <h3>{artist.name}</h3>
                        {FacebookElement}
                    </div>
                </div>
                <div className = 'options'>
                    <div className = 'options__events'>
                        {ArtistEventsElement}
                    </div>
                    <div className = 'options__delete'>
                        <button onClick = {this.handleDelete}>Delete artist</button>
                    </div>
                </div>
            </div>
        )
    };

    handleDelete = () => {
        const {name, deleteArtist} = this.props;
        deleteArtist(name);
    };
};

const mapStateToProps = () => {
    const artistSelector = artistSelectorFactory();

    return (state, ownProps) => {
        const artistState = artistSelector(state, ownProps);
        return {
            artist: artistState.artist,
            loading: artistState.loading,
            loaded: artistState.loaded
        }
    };
};

export default connect(mapStateToProps, {loadArtist, deleteArtist})(Artist);