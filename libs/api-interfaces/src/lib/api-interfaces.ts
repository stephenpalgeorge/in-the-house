export interface Message {
  message: string;
}

// the payload will be the token, if success, or the
// error message if error.
export interface ISignToken {
  status: 'success'|'error',
  payload: string
}