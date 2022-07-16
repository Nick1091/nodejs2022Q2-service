import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TrackModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavsModule } from './favs/favs.module';

@Module({
  imports: [UserModule, ArtistsModule, TrackModule, AlbumsModule, FavsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
