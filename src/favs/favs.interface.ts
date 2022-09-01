import { IAlbum } from 'src/albums/albums.interface';
import { IArtist } from 'src/artists/artists.interface';
import { ITrack } from 'src/tracks/tracks.interface';

export interface IFavoritesRepsonse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
