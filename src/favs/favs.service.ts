import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ERRORS_MSGS } from 'src/constants';
import { IAlbum } from 'src/albums/albums.interface';
import { IArtist } from 'src/artists/artists.interface';
import { ITrack } from 'src/tracks/tracks.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private prisma: PrismaService) {}

  async createTrack(track: ITrack) {
    if (!track)
      throw new UnprocessableEntityException(ERRORS_MSGS.FAVS.DOES_EXIST_TRACK);
    const favs = await this.prisma.favorite.findMany();
    let id = favs[0].id;
    if (!favs.length) {
      const favTrack = await this.prisma.favorite.create({ data: {} });
      id = favTrack.id;
    }
    await this.prisma.track.update({
      where: { id: track.id },
      data: { favoriteId: id },
    });
    return;
  }

  async removeTrack(id: string) {
    await this.prisma.track.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  async createArtist(artist: IArtist) {
    if (!artist)
      throw new UnprocessableEntityException(ERRORS_MSGS.FAVS.DOES_EXIST_TRACK);
    const favs = await this.prisma.favorite.findMany();
    let id = favs[0].id;
    if (!favs.length) {
      const favArtist = await this.prisma.favorite.create({ data: {} });
      id = favArtist.id;
    }
    await this.prisma.artist.update({
      where: { id: artist.id },
      data: { favoriteId: id },
    });
    return;
  }

  async removeArtist(id: string) {
    await this.prisma.artist.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  async createAlbum(album: IAlbum) {
    if (!album)
      throw new UnprocessableEntityException(ERRORS_MSGS.FAVS.DOES_EXIST_TRACK);
    const favs = await this.prisma.favorite.findMany();
    let id = favs[0].id;
    if (!favs.length) {
      const favArtist = await this.prisma.favorite.create({ data: {} });
      id = favArtist.id;
    }
    await this.prisma.album.update({
      where: { id: album.id },
      data: { favoriteId: id },
    });
    return;
  }

  async removeAlbum(id: string) {
    await this.prisma.album.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
  }

  async findAll() {
    const favs = await this.prisma.favorite.findMany({
      select: {
        artists: { select: { id: true, name: true, grammy: true } },
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });
    const fav = favs[0];
    return {
      artists: fav.artists ?? [],
      albums: fav.albums ?? [],
      tracks: fav.tracks ?? [],
    };
  }
}
