import { apiRoutes } from "../Common/apiRoutes";
import { UserRequest } from "../Types";
import http from "../Common/http-common";
import pathToUrl from "../Common/pathToUrl";

class UserService {
  async createUser(request: UserRequest) {
    return http
      .post(apiRoutes.createUser, request, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.data;
      });
  }

  async getUserByAuthId(id: string) {
    return await http
      .get(pathToUrl(apiRoutes.getUser, [id]))
      .then((res) => res.data);
  }
}

export default new UserService();
