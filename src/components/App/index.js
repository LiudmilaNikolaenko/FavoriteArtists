import React  from 'react';
import ArtistList from '../ArtistList';
import ArtistForm from '../ArtistForm';
import './app.scss';

function App() {
    return (
        <div className = 'wrapper'>
            <h2>Favorite artists</h2>
            <h4>with upcoming events</h4>
            <ArtistList />
            <ArtistForm />
        </div>
    )
};

export default App;