export interface ILoginSuccessResponse {
  data: IRegisterResponseType;
  meta: {
    request_id: string;
  };
}

export interface IRegisterResponseType {
  email: string;
  client_id: string;
  sl_token: string;
}

export interface ILoginState {
  client_id: string;
  isLoaded: boolean;
  email: string;
}
