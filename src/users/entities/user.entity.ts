import { Exclude, Transform } from 'class-transformer';

export class Users {
  id: string; // uuid v4
  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: Date;

  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: Date;

  constructor(partial: Partial<Users>) {
    Object.assign(this, partial);
  }
}
