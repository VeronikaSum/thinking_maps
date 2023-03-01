import { CSSProperties, FC } from "react";
import { useDrop } from "react-dnd";
import { ImageTypes } from "./ImageTypes";

const style: CSSProperties = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};

export const ThinkingMap: FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [ImageTypes.CORRECT, ImageTypes.INCORRRECT],
    drop: () => ({ name: "ThinkingMap" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
      {isActive ? "Release to drop" : "Drag a box here"}
    </div>
  );
};
