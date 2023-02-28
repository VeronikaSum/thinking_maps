import { CreateGameMapRequest } from "../Types";
import http from "../Common/http-common";
import { apiRoutes } from "../Common/apiRoutes";

class GameService {
  async createGame(request: CreateGameMapRequest) {
    return http.post(apiRoutes.createGame, request).then((res) => {
      return res.data;
    });
  }
}

export default new GameService();
