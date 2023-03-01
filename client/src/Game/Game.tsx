import { FC, useEffect, useState } from "react";
import { ThinkingMap } from "./ThinkingMap";
import { Image } from "./Image";
import ThinkingMapService from "../Services/ThinkingMapService";
import GameService from "../Services/GameService";
import { GameResponse, ThinkingMapEntity, ImageResponse } from "../Types";
import ImageService from "../Services/ImageService";

export const Game: FC = function Game() {
  const [game, setGame] = useState<GameResponse | null>(null);
  const [images, setImages] = useState<ImageResponse[]>([]);

  useEffect(() => {
    GameService.getById("1").then((res) => setGame(res));
  }, []);

  useEffect(() => {
    if (game) {
      ImageService.getById(game.map.id).then((res) => setImages(res));
    }
  }, [game]);

  console.log("game", game);
  console.log("images", images);

  return (
    <div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        <ThinkingMap />
      </div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        {images.map((image) => {
          return (
            <Image
              name={image.title.toLocaleUpperCase()}
              content={image.contentResized}
              correct={image.isCorrect}
            />
          );
        })}
      </div>
    </div>
  );
};
