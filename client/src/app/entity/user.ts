import {UserRole} from './user-role.enum';

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  img: string;
  creationTime: Date;
  userRole: UserRole;
}
