import { apiRoutes } from "../Common/apiRoutes";
import { PlayedGameRequest } from "../Types";
import http from "../Common/http-common";
import pathToUrl from "../Common/pathToUrl";

class PlayedGameService {
  async createPlayedGame(request: PlayedGameRequest) {
    return http
      .post(apiRoutes.createPlayedGame, request, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res.data;
      });
  }

  async getPlayedGameById(id: string) {
    const path = pathToUrl(apiRoutes.getPlayedGameById, [id]);
    if (path !== null) {
      return await http.get(path).then((res) => res.data);
    } else return null;
  }

  async getPlayedGameByPlayer(gameId: string, id: string) {
    const path = pathToUrl(apiRoutes.getPlayedGamesByPlayer, [gameId, id]);
    if (path !== null) {
      return await http.get(path).then((res) => res.data);
    } else return null;
  }
}

export default new PlayedGameService();
