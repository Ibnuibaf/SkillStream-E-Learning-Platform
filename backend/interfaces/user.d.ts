interface IUser {
  id: string;
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
  role?: string;
  isBlock?: boolean;
  verification?: [string];
  verified?:boolean
}

export default IUser;
