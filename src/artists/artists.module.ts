import { Module } from '@nestjs/common';
import { TrackService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { FavsService } from 'src/favs/favs.service';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, TrackService, AlbumsService, FavsService],
})
export class ArtistsModule {}
