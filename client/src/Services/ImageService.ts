import { apiRoutes } from "../Common/apiRoutes";
import http from "../Common/http-common";
import pathToUrl from "../Common/pathToUrl";

class ImageService {
  async getById(id: string) {
    return http
      .get(pathToUrl(apiRoutes.getImagesByMapId, [id]))
      .then((res) => res.data);
  }
}

export default new ImageService();
