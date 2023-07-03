import { v4 } from 'uuid';

let users = [];

export const showUsers = () => {
  return new Promise((res, _rej) => res(users));
}

export const  showUserById = (id) => {
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
  console.log('id', id);
  return new Promise((res, _rej) => {
    users = users.filter((user) => user.id !== id);
    res();
  });
}
