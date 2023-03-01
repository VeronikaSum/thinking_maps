import { FC, memo } from "react";
import { DndProvider } from "react-dnd/dist/core/DndProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Game } from "./Game";
export const GamePage: FC = memo(function Container() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Game />
    </DndProvider>
  );
});
