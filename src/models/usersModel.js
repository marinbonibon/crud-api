import { users } from '../data/users.js';
import { v4 } from "uuid";

export const showUsers = () => {
  return new Promise((res, _rej) => res(users));
}

export const showSingleUser = (id) => {
  return new Promise((res, _rej) => {
    const user = users.find((u) => u.id === id );
    res(user);
  });
}

export const create = (product) => {
  return new Promise((res, _rej) => {
    const newProduct = {id: v4(),...product};
    users.push(newProduct);
    res(newProduct);
  });
}
