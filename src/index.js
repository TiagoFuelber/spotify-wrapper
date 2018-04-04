import {
  search,
  searchArtists,
  searchAlbums,
  searchPlaylists,
} from './search';

import album from './album';

import { API_URL } from './config';

// module.exports = {
//   search,
//   searchArtists,
//   searchAlbums,
//   searchPlaylists,
//   getAlbum,
//   getAlbums,
//   getAlbumTracks,
// };

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token;
    this.album = album.bind(this)();
  }

  request(url) {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };

    return fetch(url, headers);
  }
}
