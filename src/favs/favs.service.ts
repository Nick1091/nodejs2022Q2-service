import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IAlbum } from 'src/albums/albums.interface';
import { IArtist } from 'src/artists/artists.interface';
import { ITrack } from 'src/tracks/tracks.interface';

@Injectable()
export class FavsService {
  private static artists: Array<string> = [];
  private static albums: Array<string> = [];
  private static tracks: Array<string> = [];

  async createTrack(track: ITrack) {
    if (!track) throw new UnprocessableEntityException("Track doesn't exists.");
    const isTrackExist = FavsService.tracks.find((tr) => tr === track.id);
    if (!isTrackExist) FavsService.tracks.push(track.id);
    return track;
  }

  async removeTrack(id: string, track: ITrack) {
    const isTrackIndex = FavsService.tracks.findIndex((tr) => tr === id);
    if (isTrackIndex === -1 || !track)
      throw new NotFoundException(`There is no favorite track with id: ${id}`);
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
      throw new UnprocessableEntityException("Artist doesn't exists.");
    const isArtistExist = FavsService.artists.find((tr) => tr === artist.id);
    if (!isArtistExist) FavsService.artists.push(artist.id);
    return artist;
  }

  async removeArtist(id: string, artist: IArtist) {
    const isArtistIndex = FavsService.artists.findIndex((tr) => tr === id);
    if (isArtistIndex === -1 || !artist)
      throw new NotFoundException(`There is no favorite artist with id: ${id}`);
    FavsService.artists.splice(isArtistIndex, 1);
  }

  async createAlbum(album: IAlbum) {
    if (!album) throw new UnprocessableEntityException("Album doesn't exists.");
    const isAlbumExist = FavsService.albums.find((tr) => tr === album.id);
    if (!isAlbumExist) FavsService.albums.push(album.id);
    return album;
  }

  async removeAlbum(id: string, album: IAlbum) {
    const isAlbumIndex = FavsService.albums.findIndex((tr) => tr === id);
    if (isAlbumIndex === -1 || !album)
      throw new NotFoundException(`There is no favorite album with id: ${id}`);
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
