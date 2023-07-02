import { users } from '../data/users.js';

export const showUsers = () => {
  return new Promise((res, _rej) => res(users));
}
