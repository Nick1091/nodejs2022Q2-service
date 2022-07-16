import { Module } from '@nestjs/common';
import { TrackService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';
import { FavsService } from 'src/favs/favs.service';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, TrackService, ArtistsService, FavsService],
})
export class AlbumsModule {}
