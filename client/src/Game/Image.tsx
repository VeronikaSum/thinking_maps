import { CSSProperties, Dispatch, FC, SetStateAction, useState } from "react";
import { useDrag } from "react-dnd";
import { ImageTypes } from "./ImageTypes";
import { toast } from "react-toastify";

const style: CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
  fontSize: "12px",
};

export interface ImageProps {
  id: string;
  name: string;
  content: string;
  correct: boolean;
  setUpdateImages?: Dispatch<SetStateAction<boolean>>;
  setSelectedImageId?: Dispatch<SetStateAction<string | undefined>>;
  setMistake?: Dispatch<SetStateAction<string | undefined>>;
}

interface DropResult {
  name: string;
}

export const Image: FC<ImageProps> = function Image({
  id,
  name,
  content,
  correct,
  setUpdateImages,
  setSelectedImageId,
  setMistake,
}) {
  const incorrect = () =>
    toast.error("Neteisingai 😥. Pabandyk iš naujo!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const correctAnswer = () =>
    toast.success("Teisingai! Taip ir toliau!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: correct ? ImageTypes.CORRECT : ImageTypes.INCORRRECT,
      item: {
        id: id,
        title: name,
        type: correct ? ImageTypes.CORRECT : ImageTypes.INCORRRECT,
        contentResized: content,
        correct: correct,
      },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        if (
          item &&
          dropResult &&
          item.type === ImageTypes.CORRECT &&
          setUpdateImages &&
          setSelectedImageId
        ) {
          correctAnswer();
          setUpdateImages(true);
          setSelectedImageId(item.id);
        }

        if (
          item &&
          dropResult &&
          item.type === ImageTypes.INCORRRECT &&
          setMistake
        ) {
          incorrect();
          setMistake("Padarė klaidą, pasirinko " + item.title);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [id]
  );

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div ref={drag} style={{ ...style }} data-testid={`image`}>
      {name}
      <img
        ref={drag}
        src={"data:image/jpeg;base64," + content}
        width={"150px"}
        style={{ opacity }}
      />
    </div>
  );
};
