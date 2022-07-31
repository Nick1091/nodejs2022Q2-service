import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ITrack } from 'src/tracks/tracks.interface';
import { TrackService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { IArtist } from 'src/artists/artists.interface';
import { IAlbum } from 'src/albums/albums.interface';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly trackService: TrackService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async createTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<ITrack> {
    const track = await this.trackService.findTrack(id);
    return await this.favsService.createTrack(track);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const track = await this.trackService.findTrack(id);
    await this.favsService.removeTrack(id, track);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async createArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IArtist> {
    const artist = await this.artistsService.findArtist(id);
    return await this.favsService.createArtist(artist);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const artist = await this.artistsService.findArtist(id);
    await this.favsService.removeArtist(id, artist);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<IAlbum> {
    const album = await this.albumsService.findAlbum(id);
    return await this.favsService.createAlbum(album);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    const album = await this.albumsService.findAlbum(id);
    await this.favsService.removeAlbum(id, album);
  }

  @Get()
  async findAll() {
    const favsIds = await this.favsService.findAll();

    const artists = await Promise.all(
      favsIds.artists.map(
        async (artist) => await this.artistsService.findArtist(artist),
      ),
    );

    const albums = await Promise.all(
      favsIds.albums.map(
        async (album) => await this.albumsService.findAlbum(album),
      ),
    );

    const tracks = await Promise.all(
      favsIds.tracks.map(
        async (track) => await this.trackService.findTrack(track),
      ),
    );

    const favs = {
      artists: artists,
      albums: albums,
      tracks: tracks,
    };
    return favs;
  }
}
