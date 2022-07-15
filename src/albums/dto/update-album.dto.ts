import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNumber()
  @IsNotEmpty()
  year: number;
  @IsString()
  @IsOptional()
  artistId: string;
}
