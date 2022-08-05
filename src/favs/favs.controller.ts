import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { TrackService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FavsService } from './favs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/strategy';

@Controller('favs')
export class FavsController {
  constructor(
    private readonly favsService: FavsService,
    private prisma: PrismaService,
    private readonly trackService: TrackService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  @Post('track/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const track = await this.trackService.findTrack(id);
    return await this.favsService.createTrack(track);
  }

  @Delete('track/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.trackService.findOne(id);
    return await this.favsService.removeTrack(id);
  }

  @Post('artist/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const artist = await this.artistsService.findArtist(id);
    return await this.favsService.createArtist(artist);
  }

  @Delete('artist/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    await this.artistsService.findOne(id);
    return await this.favsService.removeArtist(id);
  }

  @Post('album/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const album = await this.albumsService.findAlbum(id);
    return await this.favsService.createAlbum(album);
  }

  @Delete('album/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    await this.albumsService.findOne(id);
    return await this.favsService.removeAlbum(id);
  }

  @Get()
  async findAll() {
    return await this.favsService.findAll();
  }
}
