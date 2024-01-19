export interface User {
  id: string;
  avatar: string;
  email: string;
  name: string;
  [key: string]: any;
}

export interface InternalUsers {
  Username: string,
  UserGivenName: string,
  UserFamilyName: string,
  UserEmail: string,
  UserPhoneNumber: string,
  UserProfile: string,
  UserStatus: string,
}

export interface ExternalUsers {
  UserName: string,
  UserProfile: string,
  UserFirstName: string,
  UserLasteName: string,
  UserEmail: string,
  UserPhoneno: string,
  UserStatus: string,
}