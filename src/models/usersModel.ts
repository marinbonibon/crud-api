import { v4 } from 'uuid';
import { User } from '../types/types';

let users: Array<User> = [];

export const showUsers = () => {
  return new Promise((res) => res(users));
};

export const showUserById = (id?: string): Promise<User> => {
  return new Promise((res) => {
    const user = users.find((u: User) => u.id === id);
    // @ts-ignore
    res(user);
  });
};

export const create = (user: User) => {
  return new Promise((res) => {
    const newUser = { id: v4(), ...user };
    users.push(newUser);
    res(newUser);
  });
};

export const update = (user: User, id?: string) => {
  return new Promise((res) => {
    const updUserIndex = users.findIndex((u) => u.id === id);
    users[updUserIndex] = { id, ...user };
    res(users[updUserIndex]);
  });
};

export const delUser = (id?: string) => {
  return new Promise((res) => {
    users = users.filter((user: User) => user.id !== id);
    res(users);
  });
};
