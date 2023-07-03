import * as Users from '../models/usersModel';
import { isValidRequestBody } from '../utils/requestBodyValidation';
import { getReqBody } from '../utils/getReqBody';
import { isIdValid } from '../utils/uuidValidation';
import { badRequestError, ERRORMSG, notFoundError } from '../utils/errors';
import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../types/types';

export const getUsers = async (_req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = await Users.showUsers();
    console.log('users', users);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log('err', err);
  }
};

export const getSingleUser = async (
  _req: IncomingMessage,
  res: ServerResponse,
  id?: string,
) => {
  try {
    const user = await Users.showUserById(id);
    const validId = id?.match(isIdValid);
    if (validId) {
      if (!user) {
        notFoundError(res, ERRORMSG.USER_NOT_FOUND);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      badRequestError(res, ERRORMSG.INVALID_ID);
    }
  } catch (err) {
    console.log('err', err);
  }
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  const body: string = await getReqBody(req);
  const { username, age, hobbies } = JSON.parse(body);
  try {
    const isValidUser = isValidRequestBody(username, age, hobbies);
    if (!isValidUser) {
      badRequestError(res, ERRORMSG.INVALID_BODY);
    } else {
      const user = {
        username,
        age,
        hobbies,
      };
      const newUser = await Users.create(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    }
  } catch (err) {
    console.log('err', err);
  }
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse,
  id?: string,
) => {
  const body = await getReqBody(req);
  const { username, age, hobbies } = JSON.parse(body);
  try {
    const user: User | undefined = await Users.showUserById(id);
    const validId = id?.match(isIdValid);
    if (validId) {
      if (!user) {
        notFoundError(res, ERRORMSG.USER_NOT_FOUND);
      } else {
        const userObj: User = {
          username: username || user?.username,
          age: age || user?.age,
          hobbies: hobbies || user?.hobbies,
        };
        const updatedUser = await Users.update(userObj, id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedUser));
      }
    } else {
      badRequestError(res, ERRORMSG.INVALID_ID);
    }
  } catch (err) {
    console.log('err', err);
  }
};

export const deleteUser = async (
  _req: IncomingMessage,
  res: ServerResponse,
  id?: string,
) => {
  try {
    const user = await Users.showUserById(id);
    const validId = id?.match(isIdValid);
    if (validId) {
      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
      } else {
        await Users.delUser(id);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User was deleted' }));
      }
    } else {
      badRequestError(res, ERRORMSG.INVALID_ID);
    }
  } catch (err) {
    console.log('err', err);
  }
};
