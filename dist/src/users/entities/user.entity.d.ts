import { AdminStatus } from '../constants';
export declare class User {
    id: number;
    email: string;
    role?: AdminStatus;
    password: string;
}
