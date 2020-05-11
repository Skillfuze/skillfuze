import { User } from '../user.entity';

export type UserRegisterResponseDTO = Omit<User, 'password' | 'confirmPassword'>;
