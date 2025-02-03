import { Request } from 'express';
import type { User } from 'src/users/entities/user.entity';

export interface AuthRequest extends Request {
  user: User;
}
