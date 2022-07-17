import { Module } from '@nestjs/common';
import { TrackService } from './tracks.service';
import { TrackController } from './tracks.controller';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { FavsService } from 'src/favs/favs.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, AlbumsService, ArtistsService, FavsService],
})
export class TrackModule {}
