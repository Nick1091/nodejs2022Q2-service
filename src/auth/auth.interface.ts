export interface ITokens {
  accessToken: string;
  refresh_token: string;
}
export interface JwtPayloadWithRt extends JwtPayload {
  refreshToken: string;
}
export interface JwtPayload {
  login: string;
  sub: number;
}
export interface IPayload {
  login: string;
  id: number;
  refreshToken: string;
}
