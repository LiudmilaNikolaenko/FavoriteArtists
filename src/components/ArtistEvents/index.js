import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {eventSelectorFactory} from '../../selectors';
import {loadEvents} from '../../AC';
import Loader from '../Loader';
import './artistevents.scss';

class ArtistEvents extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        artistEvents: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            artist_id: PropTypes.string,
            datetime: PropTypes.string,
            description: PropTypes.string,
            venue: PropTypes.shape({
                name: PropTypes.string,
                city: PropTypes.string,
                region: PropTypes.string,
                country: PropTypes.string
            })
         })),
        loading: PropTypes.bool,
        loaded: PropTypes.bool,
        loadEvents: PropTypes.func,
    };

    state = {isOpen: false};

    componentWillMount() {
        const {name, loading, loaded, loadEvents} = this.props;
        if (!loaded && !loading) loadEvents(name);
    }

    render() {
        const {loading, loaded} = this.props;
        if (loading) return <Loader />;
        if (!loaded) return null;
        return (
            <div className = 'events' onClick = {this.toggleOpen}>
                <p className = 'events__button'>
                    <button>Upcoming artist events</button>
                </p>
                {this.getEventsList()}
            </div>
        )
    };

    toggleOpen = () => {
        const prIsOpen = this.state.isOpen;
        this.setState({isOpen: !prIsOpen});
    };

    getEventsList = () => {
        if (!this.state.isOpen) return null;
        const {artistEvents} = this.props;
        if (!artistEvents.length) return <p>No artist events.</p>
        return (
            <ul className = 'events__list'>
                {artistEvents.map( event => 
                <li key = {event.id}>
                    <div className = 'event'>
                        <p><span>Date: </span>{event.datetime.substring(0,10)}</p>
                        <p><span>Time: </span>{event.datetime.substring(11,16)}</p>
                        <p><span>Venue: </span>{event.venue.name}</p>
                        <p><span>City: </span>{event.venue.city}</p>
                        {event.venue.region ?
                            <p><span>Region: </span>{event.venue.region}</p> : null}
                        <p><span>Country: </span>{event.venue.country}</p>
                        {event.description ?
                            <p><span>Description: </span>{event.description}</p> : null}
                    </div>
                </li>)}
            </ul>
        )
    };
};

const mapStateToProps = () => {
    const eventSelector = eventSelectorFactory();

    return (state, ownProps) => {
        const eventState = eventSelector(state, ownProps);
        return {
            artistEvents: eventState.artistEvents,
            loading: eventState.loading,
            loaded: eventState.loaded
        }
    };
};

export default connect(mapStateToProps, {loadEvents})(ArtistEvents);