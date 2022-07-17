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
} from '@nestjs/common';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FavsService } from 'src/favs/favs.service';
import { TrackService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack } from './tracks.interface';

@Controller('track')
export class TrackController {
  constructor(
    private readonly favsService: FavsService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly trackService: TrackService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTrackDto: CreateTrackDto): Promise<ITrack> {
    if (createTrackDto.artistId !== undefined) {
      const artist = await this.artistsService.findArtist(
        createTrackDto.artistId,
      );
      createTrackDto = artist
        ? createTrackDto
        : { ...createTrackDto, artistId: null };
    }
    if (createTrackDto.albumId !== undefined) {
      const album = await this.albumsService.findAlbum(createTrackDto.albumId);
      createTrackDto = album
        ? createTrackDto
        : { ...createTrackDto, albumId: null };
    }
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ITrack[]> {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.trackService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    if (updateTrackDto.artistId !== undefined) {
      const artist = await this.artistsService.findArtist(
        updateTrackDto.artistId,
      );
      updateTrackDto = artist
        ? updateTrackDto
        : { ...updateTrackDto, artistId: null };
    }
    if (updateTrackDto.albumId !== undefined) {
      const album = await this.albumsService.findAlbum(updateTrackDto.albumId);
      updateTrackDto = album
        ? updateTrackDto
        : { ...updateTrackDto, albumId: null };
    }
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    await this.favsService.removeTrackId(id);
    return await this.trackService.remove(id);
  }
}
