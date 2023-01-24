interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

type UserLogin = Pick<IUser, 'email' | 'password'>;

export { IUser, UserLogin };
