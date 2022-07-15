export interface IUser {
  login: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export interface IPostUser extends IUser {
  id: string; // uuid v4
}
export interface IUsersStart extends IPostUser {
  password: string;
}
export interface IUpdatePassword {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
