import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ERRORS_MSGS } from 'src/constants';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack } from './tracks.interface';

@Injectable()
export class TrackService {
  private static tracks: Array<ITrack> = [];

  async create(createTrackDto: CreateTrackDto) {
    const newTrack: ITrack = {
      ...createTrackDto,
      id: uuidv4(),
    };
    TrackService.tracks.push(newTrack);
    return newTrack;
  }

  async findAll() {
    return TrackService.tracks.map((track: ITrack) => track);
  }

  async findOne(id: string) {
    const oneTrack = TrackService.tracks.find((track: ITrack) => {
      return id === track.id;
    });
    if (!oneTrack) {
      throw new NotFoundException(ERRORS_MSGS.TRACK.NOT_FOUND(id));
    }
    return oneTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = TrackService.tracks.find((item: ITrack) => item.id === id);

    if (track) {
      Object.assign(track, updateTrackDto);
    } else {
      throw new NotFoundException(ERRORS_MSGS.TRACK.NOT_FOUND(id));
    }
    return track;
  }

  async remove(id: string): Promise<void> {
    const track = TrackService.tracks.findIndex(
      (item: ITrack) => item.id === id,
    );

    if (track !== -1) {
      TrackService.tracks.splice(track, 1);
    } else {
      throw new NotFoundException(ERRORS_MSGS.TRACK.NOT_FOUND(id));
    }
  }

  async removeAlbum(id: string): Promise<void> {
    const tracks = TrackService.tracks.map((item) =>
      item.albumId === id ? { ...item, albumId: null } : item,
    );
    TrackService.tracks = tracks;
  }

  async removeArtist(id: string): Promise<void> {
    const tracks = TrackService.tracks.map((item) =>
      item.artistId === id ? { ...item, artistId: null } : item,
    );
    TrackService.tracks = tracks;
  }

  async findTrack(id: string) {
    return TrackService.tracks.find((track: ITrack) => id === track.id);
  }
}
