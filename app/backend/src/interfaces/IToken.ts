export default interface IToken {
  id?: number;
  email: string;
  username?: string;
  role?: string;
  iat?: number;
  exp?: number;
}
