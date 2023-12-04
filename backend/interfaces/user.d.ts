interface IUser {
  id:string
  name?: string;
  email: string;
  password: string;
  confirmPassword?:string
  avatar?: string;
  role?: string;
  isBlock?: boolean;
}

export default IUser
