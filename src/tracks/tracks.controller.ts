import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { TrackService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack } from './tracks.interface';
import { JwtAuthGuard } from 'src/auth/strategy';

@Controller('track')
export class TrackController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly trackService: TrackService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto) {
    if (
      createTrackDto.artistId !== undefined &&
      createTrackDto.artistId !== null
    ) {
      const artist = await this.artistsService.findArtist(
        createTrackDto.artistId,
      );
      createTrackDto = artist
        ? createTrackDto
        : { ...createTrackDto, artistId: null };
    } else {
      delete createTrackDto.artistId;
    }
    if (
      createTrackDto.albumId !== undefined &&
      createTrackDto.albumId !== null
    ) {
      const album = await this.albumsService.findAlbum(createTrackDto.albumId);
      createTrackDto = album
        ? createTrackDto
        : { ...createTrackDto, albumId: null };
    } else {
      delete createTrackDto.albumId;
    }
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ITrack[]> {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.trackService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (
      updateTrackDto.artistId !== undefined &&
      updateTrackDto.artistId !== null
    ) {
      const artist = await this.artistsService.findArtist(
        updateTrackDto.artistId,
      );
      updateTrackDto = artist
        ? updateTrackDto
        : { ...updateTrackDto, artistId: null };
    } else {
      delete updateTrackDto.artistId;
    }
    if (
      updateTrackDto.albumId !== undefined &&
      updateTrackDto.albumId !== null
    ) {
      const album = await this.albumsService.findAlbum(updateTrackDto.albumId);
      updateTrackDto = album
        ? updateTrackDto
        : { ...updateTrackDto, albumId: null };
    } else {
      delete updateTrackDto.albumId;
    }
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.trackService.remove(id);
  }
}
