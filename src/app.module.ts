import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [UserModule, ArtistsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
