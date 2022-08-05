import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Put,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ArtistsService } from 'src/artists/artists.service';
import { JwtAuthGuard } from 'src/auth/strategy';
import { IAlbum } from './albums.interface';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    if (
      createAlbumDto.artistId !== undefined &&
      createAlbumDto.artistId !== null
    ) {
      const artist = await this.artistsService.findArtist(
        createAlbumDto.artistId,
      );
      createAlbumDto = artist
        ? createAlbumDto
        : { ...createAlbumDto, artistId: null };
    } else {
      delete createAlbumDto.artistId;
    }
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<IAlbum[]> {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.albumsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (
      updateAlbumDto.artistId !== undefined &&
      updateAlbumDto.artistId !== null
    ) {
      const artist = await this.artistsService.findArtist(
        updateAlbumDto.artistId,
      );
      updateAlbumDto = artist
        ? updateAlbumDto
        : { ...updateAlbumDto, artistId: null };
    } else {
      delete updateAlbumDto.artistId;
    }
    return await this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.albumsService.remove(id);
  }
}
