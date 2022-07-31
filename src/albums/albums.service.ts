import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ERRORS_MSGS } from 'src/constants';
import { IAlbum } from './albums.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    if (!['name', 'year'].every((field: string) => field in createAlbumDto)) {
      throw new BadRequestException('Body does not contain required fields');
    }
    return this.prisma.album.create({
      data: {
        ...createAlbumDto,
      },
    });
  }

  async findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findFirst({
      where: { id: id },
      // select: { artist: true },
    });
    if (!album) {
      throw new NotFoundException(ERRORS_MSGS.ALBUM.NOT_FOUND(id));
    }
    return album;
  }

  async findAlbum(id: string) {
    return await this.prisma.album.findFirst({
      where: { id },
      // select: { artist: true },
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum> {
    const album = await this.prisma.album.findFirst({
      where: { id: id },
      // select: { artist: true },
    });

    if (!album) {
      throw new NotFoundException(ERRORS_MSGS.ALBUM.NOT_FOUND(id));
    }
    return this.prisma.album.update({
      where: { id },
      data: { ...updateAlbumDto },
    });
  }

  async remove(id: string) {
    const album = await this.prisma.album.findFirst({
      where: { id },
      // select: { artist: true },
    });

    if (!album) {
      throw new NotFoundException(ERRORS_MSGS.ALBUM.NOT_FOUND(id));
    }
    return this.prisma.album.delete({ where: { id } });
  }

  // async removeArtist(id: string): Promise<void> {
  //   AlbumsService.albums = AlbumsService.albums.map((album) => {
  //     if (album.artistId === id) {
  //       return { ...album, artistId: null };
  //     } else return album;
  //   });
  // }
}
