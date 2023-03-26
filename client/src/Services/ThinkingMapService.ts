import { apiRoutes } from "../Common/apiRoutes";
import http from "../Common/http-common";
import pathToUrl from "../Common/pathToUrl";

class ThinkingMapService {
  async postThinkingMap(request: FormData) {
    return http
      .post(apiRoutes.createThinkingMap, request, {
        data: request,
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        return res.data;
      });
  }

  async getAllThinkingMaps() {
    return http.get(apiRoutes.getAllThinkingMaps).then((res) => res.data);
  }

  async getById(id: string) {
    return http
      .get(pathToUrl(apiRoutes.getThinkingMapById, [id]))
      .then((res) => res.data);
  }
}

export default new ThinkingMapService();
