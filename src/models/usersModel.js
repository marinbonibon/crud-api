import { users } from '../data/users.js';
import { v4 } from "uuid";

export const showUsers = () => {
  return new Promise((res, _rej) => res(users));
}

export const showUserById = (id) => {
  return new Promise((res, _rej) => {
    const user = users.find((u) => u.id === id );
    res(user);
  });
}

export const create = (user) => {
  return new Promise((res, _rej) => {
    const newUser = {id: v4(),...user};
    users.push(newUser);
    res(newUser);
  });
}

export const update = (id, user) => {
  return new Promise((res, _rej) => {
    const updUserIndex = users.findIndex((u) => u.id === id);
    users[updUserIndex] = {id, ...user};
    res(users[updUserIndex]);
  });

}

export const delUser = (id) => {
  return new Promise((res, _rej) => {
    const delUserIndex = users.findIndex((u) => u.id === id);
    users.splice(delUserIndex);
    res();
  });
}
