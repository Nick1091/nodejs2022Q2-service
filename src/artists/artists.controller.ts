import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  Put,
  Delete,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { FavsService } from 'src/favs/favs.service';
import { TrackService } from 'src/tracks/tracks.service';
import { IArtist } from './artists.interface';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistsController {
  constructor(
    private readonly favsService: FavsService,
    private readonly artistsService: ArtistsService,
    private readonly trackService: TrackService,
    private readonly albumsService: AlbumsService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistsService.create(createArtistDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<IArtist[]> {
    return await this.artistsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.artistsService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    // await this.trackService.removeArtist(id);
    // await this.albumsService.removeArtist(id);
    // await this.favsService.removeArtistId(id);
    return await this.artistsService.remove(id);
  }
}
