import { Module } from '@nestjs/common';

import { TrackService } from 'src/tracks/tracks.service';

import { ArtistsService } from 'src/artists/artists.service';

import { FavsService } from 'src/favs/favs.service';

import { AlbumsService } from './albums.service';

import { AlbumsController } from './albums.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    TrackService,
    ArtistsService,
    FavsService,
    PrismaService,
  ],
})
export class AlbumsModule {}
