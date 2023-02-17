import { apiRoutes } from "../Common/apiRoutes";
import http from "../Common/http-common";

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
}

export default new ThinkingMapService();
