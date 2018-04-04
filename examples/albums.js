global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token: 'BQDDCcIeexZKsRbAzvPwBU8vD_cTF_WlkFfqTvfswey77S-Ey9v8CZvSDL7ieIgspKgvmdBf5hUHtbPQcyMmLKERlaGLgz7OGKbWYLpmIsdyEiySGIK41o1MWNlyiOMb9_NEBGbqRfIA',
});

const albums = spotify.search.albums('Incubus');

albums
  .then(data => console.log(data.json()))
  .catch(error => console.log('Erro: ', error));
