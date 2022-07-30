import { Injectable, NotFoundException } from '@nestjs/common';
import { ERRORS_MSGS } from 'src/constants';
import { IArtist } from './artists.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistsService {
  private static artists: Array<IArtist> = [];
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (!artist) {
      throw new NotFoundException(ERRORS_MSGS.ARTIST.NOT_FOUND(id));
    }
    return artist;
  }

  async findArtist(id: string) {
    const artist = await this.prisma.artist.findFirst({
      where: { id },
    });
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<IArtist> {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (!artist) {
      throw new NotFoundException(ERRORS_MSGS.ARTIST.NOT_FOUND(id));
    }
    return this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
  }

  async remove(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (!artist) {
      throw new NotFoundException(ERRORS_MSGS.ARTIST.NOT_FOUND(id));
    }
    return this.prisma.artist.delete({ where: { id } });
  }
}
