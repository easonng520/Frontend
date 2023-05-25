export default interface IUser {
  id?: any | null,
  username?: string | null,
  email?: string,
  password?: string,
  centre?: string,
  favourites?: string,
  roles?: Array<string>
}