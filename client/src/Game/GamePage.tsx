import { FC, memo } from "react";
import { DndProvider } from "react-dnd/dist/core/DndProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { Game } from "./Game";
export const GamePage: FC = memo(function Container() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <Game />
    </DndProvider>
  );
});
