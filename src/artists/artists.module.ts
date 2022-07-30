import { Module } from '@nestjs/common';
import { TrackService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FavsService } from 'src/favs/favs.service';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    TrackService,
    AlbumsService,
    FavsService,
    PrismaService,
  ],
})
export class ArtistsModule {}
