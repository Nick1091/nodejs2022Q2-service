import { Module } from '@nestjs/common';
import { TrackService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [FavsController],
  providers: [
    FavsService,
    TrackService,
    ArtistsService,
    AlbumsService,
    PrismaService,
  ],
})
export class FavsModule {}
