import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
import chai, { expect } from 'chai';
import SpotifyWrapper from '../src/index';

sinonStubPromise(sinon);

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('album', () => {
  let spotify;
  let stubedFetch;
  let promise;

  beforeEach( () => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });

    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise();
  });

  afterEach( () => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();

      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTk');

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
    });

    it('should return the correct data from promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = spotify.album.getAlbums();

      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk');

      const albums2 = spotify.album.getAlbums(['4aawyAB9vmqN3uQ7FjRGTk', '5aawyAB9vmqN3uQ7FjRGTk']);

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTk,5aawyAB9vmqN3uQ7FjRGTk');
    });

    it('should return the correct data from promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getAlbums('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      const albumTracks = spotify.album.getTracks();

      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albumTracks = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');

      const albumTracks2 = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTk');

      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk/tracks');
    });

    it('should return the correct data from promise', () => {
      promise.resolves({ album: 'name' });
      const album = spotify.album.getTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });
    });
  });
});
