import { User } from '@/views/users/domain/';

export class UserApiAdapter {
  public id: string;
  public name: string;
  public email: string;
  public profile_image: { name: string } | null;
  public password: string;

  constructor(
    id: string,
    name: string,
    email: string,
    profile_image: { name: string } | null,
    password: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.profile_image = profile_image;
    this.password = password;
  }

  static fromApi(userApiAdapter: UserApiAdapter): User {
    return new User(
      userApiAdapter.id,
      userApiAdapter.name,
      userApiAdapter.email,
      userApiAdapter.profile_image,
      userApiAdapter.password
    );
  }

  static toApi(user: User): UserApiAdapter {
    return new UserApiAdapter(
      user.getId(),
      user.getName(),
      user.getEmail(),
      user.getProfileImage(),
      user.getPassword()
    );
  }
}
