export interface SignUpResponseState {
  message: string;
  responseType: ResponseType;
}

export enum ResponseType {
  SUCEESS,
  ERROR,
  NONE,
}
