import { apiRoutes } from "../Common/apiRoutes";
import { Group, GroupRequest, UserRequest } from "../Types";
import http from "../Common/http-common";
import pathToUrl from "../Common/pathToUrl";

class GroupService {
  async createGroup(request: GroupRequest) {
    return http
      .post(apiRoutes.groupCreate, request, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.data;
      });
  }

  async getAllGroupsByAuthId(id: string) {
    const path = pathToUrl(apiRoutes.getGroupsByUserId, [id]);
    if (path !== null) {
      return await http.get(path).then((res) => res.data);
    } else {
      return null;
    }
  }

  async getGroupById(id: string) {
    const path = pathToUrl(apiRoutes.getGroup, [id]);
    if (path !== null) {
      return await http.get(path).then((res) => res.data);
    } else return null;
  }
}

export default new GroupService();
