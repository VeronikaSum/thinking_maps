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
    const path = pathToUrl(apiRoutes.getUser, [id]);
    if (path !== null) {
      return await http.get(path).then((res) => res.data);
    } else return null;
  }
}

export default new UserService();
