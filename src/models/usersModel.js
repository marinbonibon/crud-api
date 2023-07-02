import { users } from '../data/users.js';

export const showUsers = () => {
  return new Promise((res, _rej) => res(users));
}

export const showSingleUser = (id) => {
  return new Promise((res, _rej) => {
    const user = users.find((u) => u.id === id );
    res(user);
  });
}
