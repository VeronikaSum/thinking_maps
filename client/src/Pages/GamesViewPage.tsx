import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pathToUrl from "../Common/pathToUrl";
import { routes } from "../Common/routes";
import GameService from "../Services/GameService";
import { GameResponse } from "../Types";

export default function GamesViewPage() {
  const { user: auth0User } = useAuth0();
  const [games, setGames] = useState<GameResponse[] | null>();

  const navigate = useNavigate();

  useEffect(() => {
    if (auth0User && auth0User.sub) {
      GameService.getByAuthId(auth0User?.sub!).then((res) => {
        setGames(res);
      });
    }
  }, [auth0User?.sub]);

  return (
    <div className="grid flex-grow bg-base-100 card rounded-box place-items-center shadow-xl mt-4 ml-4">
      <div className="card-body">
        <h2 className="card-title text-center text-2xl font-bold ">
          Sukurti žaidimai:
        </h2>
        {games && (
          <table className="table mx-auto">
            <thead>
              <tr>
                <th></th>
                <th>Pavadinimas</th>
                <th>Kodas</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => {
                return (
                  <tr key={game.id}>
                    <th>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(pathToUrl(routes.gameDetails, [game.id]))
                        }
                      >
                        Daugiau
                      </button>
                    </th>
                    <th>{game.map.title}</th>
                    <th>{game.generatedCode}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
