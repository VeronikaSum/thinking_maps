export const apiRoutes = {
  getAllThinkingMaps: "/thinking-map",
  createThinkingMap: "/thinking-map",
  getThinkingMapById: "/thinking-map/:id",

  getUser: "/user/:id",
  createUser: "/user",

  groupCreate: "/group",
  getGroupsByUserId: "/group/user/:id",
  getGroup: "/group/:id",

  createGame: "/game",
  getGameById: "/game/:id",
  getGameByAuthId: "/game/user/:id",
  getGameByCode: "/game/generated/:code",

  getImagesByMapId: "/image/:id",

  createPlayedGame: "/played-game",
  getPlayedGameById: "/played-game/:id",
  getPlayedGamesByPlayer: "/played-game/:gameId/child/:id",
};
