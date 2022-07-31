import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ERRORS_MSGS } from 'src/constants';
import { IAlbum } from 'src/albums/albums.interface';
import { IArtist } from 'src/artists/artists.interface';
import { ITrack } from 'src/tracks/tracks.interface';

@Injectable()
export class FavsService {
  private static artists: Array<string> = [];
  private static albums: Array<string> = [];
  private static tracks: Array<string> = [];

  async createTrack(track: ITrack) {
    if (!track)
      throw new UnprocessableEntityException(ERRORS_MSGS.FAVS.DOES_EXIST_TRACK);
    const isTrackExist = FavsService.tracks.find((tr) => tr === track.id);
    if (!isTrackExist) FavsService.tracks.push(track.id);
    return track;
  }

  async removeTrack(id: string, track: ITrack) {
    const isTrackIndex = FavsService.tracks.findIndex((tr) => tr === id);
    if (isTrackIndex === -1 || !track)
      throw new NotFoundException(ERRORS_MSGS.FAVS.NOT_FOUND_TRACK(id));
    FavsService.tracks.splice(isTrackIndex, 1);
  }

  async removeTrackId(id: string) {
    FavsService.tracks = FavsService.tracks.filter((trackId) => trackId !== id);
  }

  async removeArtistId(id: string) {
    FavsService.artists = FavsService.artists.filter(
      (artistId) => artistId !== id,
    );
  }

  async removeAlbumId(id: string) {
    FavsService.albums = FavsService.albums.filter((albumId) => albumId !== id);
  }

  async createArtist(artist: IArtist) {
    if (!artist)
      throw new UnprocessableEntityException(
        ERRORS_MSGS.FAVS.DOES_EXIST_ARTIST,
      );
    const isArtistExist = FavsService.artists.find((tr) => tr === artist.id);
    if (!isArtistExist) FavsService.artists.push(artist.id);
    return artist;
  }

  async removeArtist(id: string, artist: IArtist) {
    const isArtistIndex = FavsService.artists.findIndex((tr) => tr === id);
    if (isArtistIndex === -1 || !artist)
      throw new NotFoundException(ERRORS_MSGS.FAVS.NOT_FOUND_ARTIST(id));
    FavsService.artists.splice(isArtistIndex, 1);
  }

  async createAlbum(album: IAlbum) {
    if (!album)
      throw new UnprocessableEntityException(ERRORS_MSGS.FAVS.DOES_EXIST_ALBUM);
    const isAlbumExist = FavsService.albums.find((tr) => tr === album.id);
    if (!isAlbumExist) FavsService.albums.push(album.id);
    return album;
  }

  async removeAlbum(id: string, album: IAlbum) {
    const isAlbumIndex = FavsService.albums.findIndex((tr) => tr === id);
    if (isAlbumIndex === -1 || !album)
      throw new NotFoundException(ERRORS_MSGS.FAVS.NOT_FOUND_ALBUM(id));
    FavsService.albums.splice(isAlbumIndex, 1);
  }

  async findAll() {
    return {
      artists: FavsService.artists,
      tracks: FavsService.tracks,
      albums: FavsService.albums,
    };
  }
}
