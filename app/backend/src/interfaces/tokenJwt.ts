export default interface IJwtconfig {
//   algorithm: string,
  expiresIn: string,
}

export interface IToken {
  token:string,
}

export interface IVerifyToken {
  data: {
    id: number,
    role:string,
    email:string,
  }
}
