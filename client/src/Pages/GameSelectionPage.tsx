import { useForm } from "react-hook-form";
import GameService from "../Services/GameService";
import { useNavigate } from "react-router-dom";
import pathToUrl from "../Common/pathToUrl";
import { Child, GameResponse, Group } from "../Types";
import { routes } from "../Common/routes";
import { useState } from "react";
import GroupService from "../Services/GroupService";

export default function GameSelectionPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameResponse | null>(null);
  const [group, setGroup] = useState<Group | null>(null);

  const onGameNumberSumbit = async (data: any) => {
    await GameService.getByCode(data.code).then(async (res: GameResponse) => {
      setGame(res);
      await GroupService.getGroupById(res.group.id).then((res: Group) => {
        setGroup(res);
      });
    });
  };

  return (
    <>
      <h1 className="text-center text-3xl font-bold mt-0 mb-6">
        Pradėkime žaidimą!
      </h1>
      <div className="card w-96 mx-auto bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit(onGameNumberSumbit)}>
          <div className="flex flex-col">
            <h1 className="text-center text-1xl font-bold mt-4 mb-6">
              Įvesk žaidimo numerį:
            </h1>
            <input
              placeholder="Numeris"
              className="input mx-auto input-bordered w-full max-w-xs mb-4"
              type="text"
              {...register("code", {})}
            />
            {!group && (
              <button className="btn mx-auto mb-4 btn-wide" type="submit">
                Tęsti
              </button>
            )}
          </div>
        </form>
        {game && group && group.child && (
          <div className="flex flex-col mb-8">
            <h1 className="text-center text-1xl font-bold mt-4 mb-6">
              Pasirink savo vardą:
            </h1>
            <ul className="menu bg-base-100 w-56 border-solid rounded-box border-[1px] box mx-auto">
              {group.child.map((child: Child) => {
                return (
                  <li>
                    <button
                      className="border-solid border-[1px]"
                      onClick={() =>
                        navigate(
                          pathToUrl(routes.gamePage, [game.id, child.id])
                        )
                      }
                    >
                      {child.firstName + " " + child.lastName}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
