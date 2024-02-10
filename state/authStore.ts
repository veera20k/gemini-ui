import { User } from '@/types/user';

type AuthStore = {
	accessToken: string | undefined;
	user: User | undefined;
}