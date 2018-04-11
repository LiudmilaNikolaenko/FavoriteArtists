# Favorite artists

1. Web app uses BandsInTown API as backend.
2. List of user's favorite artists (5-10 artists) contain artist name and image (fetched from single artist information endpoint), amount of upcoming events.
3. Each item in the list is clickable and lead to popup with detailed info about upcoming events (upcoming artist's events endpoint).
4. User can add and remove artists from the list.

#### Technologies:

React, Redux, SCSS.

###### Install

npm install

###### Toggle Development/Production

1. webpack.config.js => publicPath
2. index.html => script

###### Development

npm start (for Windows)

###### Production

npm run build (for Windows) => index.html
