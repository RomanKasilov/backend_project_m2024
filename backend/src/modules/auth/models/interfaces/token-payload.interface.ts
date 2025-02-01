import { UserID } from '../../../../common/types/entities-id.types';

export interface ITokenPayload {
  userId: UserID;
  email: string;
}
