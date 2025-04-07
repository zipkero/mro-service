export type UserDto = {
  id: string;
  email: string;
  name: string;
  password: string;
  hphone: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCreateDto = Omit<
  UserDto,
  'id' | 'lastLogin' | 'createdAt' | 'updatedAt'
>;

export type UserUpdateDto = Partial<UserDto> & {
  id: string;
};

export type UserLoginDto = Pick<UserDto, 'email' | 'password'>;
