export interface IFullPostModel {
  created_time: string;
  from_id: string;
  from_name: string;
  id: string;
  message: string;
  type: string;
}

export interface IShortPostModel {
  created_time: string;
  message: string;
}

export interface IUserModel {
  id: string;
  name: string;
}

export interface IFailedResponse {
  error: {
    code: string;
    description: string;
    message: string;
  };
  meta: {
    request_id: string;
  };
}
