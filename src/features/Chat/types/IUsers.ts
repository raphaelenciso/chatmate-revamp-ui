import type { IPaginationPayload } from '@/types/IPayload';
import type { IResponse } from '@/types/IResponse';
import type { IUser } from '@/types/IUser';

export interface IUserGetPayload extends IPaginationPayload {
  username?: string;
  email?: string;
  id?: string;
  excludeSelf?: boolean;
}

export interface IUserGetResponse extends IResponse {
  data: {
    users: IUser[];
  };
}
