interface IUser {
  id: string;
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  avatar?: string;
  role?: string;
  isBlock?: boolean;
  verification?:object;
  verified?:boolean
  learnings:string[]
}

export default IUser;
