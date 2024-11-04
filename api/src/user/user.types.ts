import { $Enums } from '@prisma/client';

export interface LogAccountData {
  userIdOwner: string;
  userIdTarget: string;
  action: $Enums.ActionUserAccount;
}
