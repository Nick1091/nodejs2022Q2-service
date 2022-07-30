import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ERRORS_MSGS } from 'src/constants';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    if (
      !['name', 'duration'].every((field: string) => field in createTrackDto)
    ) {
      throw new BadRequestException('Body does not contain required fields');
    }
    return this.prisma.track.create({ data: createTrackDto });
  }

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (!track) {
      throw new NotFoundException(ERRORS_MSGS.TRACK.NOT_FOUND(id));
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findFirst({ where: { id } });

    if (!track) {
      throw new NotFoundException(ERRORS_MSGS.TRACK.NOT_FOUND(id));
    }
    return this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });
  }

  async remove(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });

    if (!track) {
      throw new NotFoundException(ERRORS_MSGS.TRACK.NOT_FOUND(id));
    }
    return this.prisma.track.delete({ where: { id } });
  }

  async findTrack(id: string) {
    return await this.prisma.track.findFirst({ where: { id } });
  }
}
