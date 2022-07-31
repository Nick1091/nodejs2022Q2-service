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
    if (!favs.length) {
      const favTrack = await this.prisma.favorite.create({ data: {} });
      await this.prisma.track.update({
        where: { id: track.id },
        data: { favoriteId: favTrack.id },
      });
    } else {
      await this.prisma.track.update({
        where: { id: track.id },
        data: { favoriteId: favs[0].id },
      });
    }
    return;
  }

  async removeTrack(id: string) {
    await this.prisma.track.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
    return;
  }

  async createArtist(artist: IArtist) {
    if (!artist)
      throw new UnprocessableEntityException(ERRORS_MSGS.FAVS.DOES_EXIST_TRACK);
    const favs = await this.prisma.favorite.findMany();
    if (!favs.length) {
      const favArtist = await this.prisma.favorite.create({ data: {} });
      await this.prisma.artist.update({
        where: { id: artist.id },
        data: { favoriteId: favArtist.id },
      });
    } else {
      await this.prisma.artist.update({
        where: { id: artist.id },
        data: { favoriteId: favs[0].id },
      });
    }
  }

  async removeArtist(id: string) {
    await this.prisma.artist.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
    return;
  }

  async createAlbum(album: IAlbum) {
    if (!album)
      throw new UnprocessableEntityException(ERRORS_MSGS.FAVS.DOES_EXIST_TRACK);
    const favs = await this.prisma.favorite.findMany();
    if (!favs.length) {
      const favAlbum = await this.prisma.favorite.create({ data: {} });
      await this.prisma.album.update({
        where: { id: album.id },
        data: { favoriteId: favAlbum.id },
      });
    } else {
      await this.prisma.album.update({
        where: { id: album.id },
        data: { favoriteId: favs[0].id },
      });
    }
    return;
  }

  async removeAlbum(id: string) {
    await this.prisma.album.update({
      where: { id },
      data: { favoriteId: { set: null } },
    });
    return;
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
      artists: favs.length && fav.artists ? fav.artists : [],
      albums: favs.length && fav.albums ? fav.albums : [],
      tracks: favs.length && fav.tracks ? fav.tracks : [],
    };
  }
}
