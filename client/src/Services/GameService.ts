import { CreateGameMapRequest } from "../Types";
import http from "../Common/http-common";
import { apiRoutes } from "../Common/apiRoutes";
import pathToUrl from "../Common/pathToUrl";

class GameService {
  async createGame(request: CreateGameMapRequest) {
    return http.post(apiRoutes.createGame, request).then((res) => {
      return res.data;
    });
  }

  async getById(id: string) {
    return http
      .get(pathToUrl(apiRoutes.getGameById, [id]))
      .then((res) => res.data);
  }

  async getByAuthId(id: string) {
    return http
      .get(pathToUrl(apiRoutes.getGameByAuthId, [id]))
      .then((res) => res.data);
  }

  async getByCode(code: string) {
    return http
      .get(pathToUrl(apiRoutes.getGameByCode, [code]))
      .then((res) => res.data);
  }
}

export default new GameService();
