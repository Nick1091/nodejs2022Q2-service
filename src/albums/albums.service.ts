import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ERRORS_MSGS } from 'src/constants';
import { IAlbum } from './albums.interface';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  private static albums: Array<IAlbum> = [];
  async create(createAlbumDto: CreateAlbumDto): Promise<IAlbum> {
    const newAlbum: IAlbum = {
      ...createAlbumDto,
      id: uuidv4(),
    };
    AlbumsService.albums.push(newAlbum);
    return newAlbum;
  }

  async findAll() {
    return AlbumsService.albums.map((album: IAlbum) => album);
  }

  async findOne(id: string) {
    const oneArtist = AlbumsService.albums.find((artist: IAlbum) => {
      return id === artist.id;
    });
    if (!oneArtist) {
      throw new NotFoundException(ERRORS_MSGS.ALBUM.NOT_FOUND(id));
    }
    return oneArtist;
  }

  async findAlbum(id: string) {
    return AlbumsService.albums.find((artist: IAlbum) => id === artist.id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<IAlbum> {
    const album = AlbumsService.albums.find((item: IAlbum) => item.id === id);

    if (album) {
      Object.assign(album, updateAlbumDto);
    } else {
      throw new NotFoundException(ERRORS_MSGS.ALBUM.NOT_FOUND(id));
    }
    return album;
  }

  async remove(id: string): Promise<void> {
    const album = AlbumsService.albums.findIndex(
      (item: IAlbum) => item.id === id,
    );

    if (album !== -1) {
      AlbumsService.albums.splice(album, 1);
    } else {
      throw new NotFoundException(ERRORS_MSGS.ALBUM.NOT_FOUND(id));
    }
  }

  async removeArtist(id: string): Promise<void> {
    AlbumsService.albums = AlbumsService.albums.map((album) => {
      if (album.artistId === id) {
        return { ...album, artistId: null };
      } else return album;
    });
  }
}
