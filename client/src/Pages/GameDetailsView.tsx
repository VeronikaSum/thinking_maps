import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameService from "../Services/GameService";
import { Child, GameResponse, PlayedGameResponse } from "../Types";
import PlayedGameService from "../Services/PlayedGameService";
import { formatDate, formatTime } from "../utils";

export default function GameDetailsView() {
  const { id } = useParams();
  const [game, setGame] = useState<GameResponse | null>(null);
  const [childId, setChildId] = useState<string | null>(null);
  const [results, setResults] = useState<PlayedGameResponse[] | null>(null);

  useEffect(() => {
    if (id) {
      GameService.getById(id).then((res) => setGame(res));
    }
  }, [id]);

  useEffect(() => {
    if (childId && game) {
      PlayedGameService.getPlayedGameByPlayer(game.id, childId).then((res) =>
        setResults(res)
      );
    }
  }, [childId]);

  if (!game) {
    return <></>;
  }
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="max-w-xs">
        <img src={game?.map.content} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {game.map.title}
          {" (sugeneruotas kodas: "}
          {game?.generatedCode}
          {")"}
        </h2>
        <div className="card card-side bg-base-200 shadow-xl max-w-md">
          <div className="card-body">
            <h2 className="card-title">Priskirta grupė: {game.group.name}</h2>
            {game?.group.child && (
              <table className="table table-normal">
                <thead>
                  <tr>
                    <th>Vaikai</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {game.group.child.map((child) => {
                    return (
                      <tr key={child.id}>
                        <th>
                          {child.firstName} {child.lastName}
                        </th>
                        <th>
                          <button
                            className="btn btn-primary"
                            onClick={() => setChildId(child.id)}
                          >
                            Rezultatai
                          </button>
                        </th>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          {results && results.length > 0 && (
            <div className="card card-side bg-base-200 shadow-xl max-w-md">
              <div className="card-body">
                <h2 className="card-title">Rezultatai:</h2>
                <table className="table table-normal">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Laikas</th>
                      <th>Klaidos</th>
                      <th>Užuominos</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result) => {
                      return (
                        <tr key={result.id}>
                          <th>{formatDate(result.playedAt)}</th>
                          <th>{formatTime(result.playTime)}</th>
                          <th>
                            {result.mistakes.length > 0
                              ? result.mistakes
                              : "Klaidų nebuvo"}
                          </th>
                          <th>{result.cluesCount}</th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
