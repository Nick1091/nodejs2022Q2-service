import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { IArtist } from './artists.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private static artists: Array<IArtist> = [];

  async create(createArtistDto: CreateArtistDto): Promise<IArtist> {
    const newArtist: IArtist = {
      ...createArtistDto,
      id: uuidv4(),
    };
    ArtistsService.artists.push(newArtist);
    return newArtist;
  }

  async findAll() {
    return ArtistsService.artists.map((artist: IArtist) => artist);
  }

  async findOne(id: string) {
    const oneArtist = ArtistsService.artists.find((artist: IArtist) => {
      return id === artist.id;
    });
    if (!oneArtist) {
      throw new NotFoundException('Artist not found.');
    }
    return oneArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<IArtist> {
    const artist = ArtistsService.artists.find(
      (item: IArtist) => item.id === id,
    );

    if (artist) {
      Object.assign(artist, updateArtistDto);
    } else {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }
    return artist;
  }

  async remove(id: string): Promise<void> {
    const artist = ArtistsService.artists.findIndex(
      (item: IArtist) => item.id === id,
    );

    if (artist !== -1) {
      ArtistsService.artists.splice(artist, 1);
    } else {
      throw new NotFoundException(`There is no artist with id: ${id}`);
    }
  }
}
