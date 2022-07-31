export const VERSIONS = {
  FIRST: 1,
};
export const ERRORS_MSGS = {
  INVALID_UUID: 'Bad request. Validation failed (uuid v4 is expected)',
  USER: {
    USER_NOT_FOUND: 'User not found.',
    PASSWORD_WRONG: 'Old Password is wrong',
  },
  TRACK: {
    NOT_FOUND: (id: string) => `There is no track with id: ${id}`,
  },
  ARTIST: {
    NOT_FOUND: (id: string) => `There is no artist with id: ${id}`,
  },
  ALBUM: {
    NOT_FOUND: (id: string) => `There is no album with id: ${id}`,
  },
  FAVS: {
    NOT_FOUND_TRACK: (id: string) =>
      `There is no favorite track with id: ${id}`,
    NOT_FOUND_ARTIST: (id: string) =>
      `There is no favorite artist with id: ${id}`,
    NOT_FOUND_ALBUM: (id: string) =>
      `There is no favorite album with id: ${id}`,
    DOES_EXIST_TRACK: "Track doesn't exists.",
    DOES_EXIST_ALBUM: "Album doesn't exists.",
    DOES_EXIST_ARTIST: "Artist doesn't exists.",
  },
};
