import { createUser, deleteUser, getSingleUser, getUsers, updateUser } from './controllers/usersController.js';
import { ERRORMSG, internalError, notFoundError } from './utils/errors.js';

const mainRoute = '/api/users';

export const router = async (req, res) => {
  try {
    const id = req.url.split('/').pop();

    if (!req.url.includes(mainRoute)) {
      notFoundError(res, ERRORMSG.ROUTE_NOT_FOUND);
    }

    switch (req.method) {
      case 'GET':
         if (req.url === mainRoute) {
          await getUsers(req, res);
        } else {
           await getSingleUser(req, res, id);
         }
        break;
      case 'POST':
        await createUser(req, res);
        break;
      case 'PUT':
        await updateUser(req, res, id);
        break;
      case 'DELETE':
        await deleteUser(req, res, id);
        break;
      default:
        notFoundError(res, ERRORMSG.ROUTE_NOT_FOUND);
    }
  } catch (err) {
    internalError(res);
  }
};
