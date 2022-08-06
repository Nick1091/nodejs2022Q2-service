export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
export interface JwtPayloadWithRt extends JwtPayload {
  refreshToken: string;
}
export interface JwtPayload {
  login: string;
  sub: string;
}
export interface IPayload {
  login: string;
  id: number;
  refreshToken: string;
}
