import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      const createUsers = container.resolve(CreateUserService);

      const user = await createUsers.execute({
        name,
        email,
        password,
      });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default UserController;
