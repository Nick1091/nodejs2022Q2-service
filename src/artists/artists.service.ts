import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';
import { IArtist } from './artists.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  data: string;
  db: IArtist[];
  constructor() {
    this.db = [];
  }
  async create(createArtistDto: CreateArtistDto): Promise<IArtist> {
    const newArtist: IArtist = {
      ...createArtistDto,
      id: v4(),
    };
    // const data = (await db.create(this.data, newArtist)) as IArtist;
    // return data;
    return newArtist;
  }

  async findAll() {
    return `This action returns all artists`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} artist`;
  }

  // async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
  //   const artist = this.artists.find((item: Artist) => item.id === id);

  //   if (artist) {
  //     Object.assign(artist, updateArtistDto);
  //   } else {
  //     throw new NotFoundException(`There is no artist with id: ${id}`);
  //   }
  //   return artist;
  // }

  // async remove(id: string): Promise<void> {
  //   const artist: Artist = this.artists.find((item: Artist) => item.id === id);

  //   if (artist) {
  //     this.artists = this.artists.filter((item) => item.id !== id);
  //   } else {
  //     throw new NotFoundException(`There is no artist with id: ${id}`);
  //   }
  // }
}
