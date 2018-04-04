import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import chai, { expect } from 'chai';
import SpotifyWrapper from '../src/index';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Search', () => {
  let spotify;
  let fetchedStub;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });

    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {
    it('should exist the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('should exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('should exist the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.artists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      const artists2 = spotify.search.artists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });
  });

  describe('spotify.search.albums', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.albums('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      const artists2 = spotify.search.albums('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.tracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=tracks');

      const artists2 = spotify.search.tracks('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=tracks');
    });
  });

  describe('spotify.search.playlists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.playlists('Incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      const artists2 = spotify.search.playlists('Muse');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });
  });
});
