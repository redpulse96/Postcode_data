import { Request } from 'express';
// import { Users } from 'src/modules/user/user.entity';

export type RequestWithUser = Request & {
  user: {
    is_admin: boolean;
  };
};
export type OrderDir = 'DESC' | 'ASC';
