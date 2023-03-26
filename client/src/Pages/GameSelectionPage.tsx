import { useForm } from "react-hook-form";
import GameService from "../Services/GameService";
import { useNavigate } from "react-router-dom";
import pathToUrl from "../Common/pathToUrl";
import { GameResponse } from "../Types";
import { routes } from "../Common/routes";

export default function GameSelectionPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    await GameService.getByCode(data.code).then((res: GameResponse) =>
      navigate(pathToUrl(routes.gamePage, [res.id]))
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <h1 className="text-center text-1xl font-bold mt-0 mb-6">
          Įvesk žaidimo numerį:
        </h1>
        <input
          placeholder="Numeris"
          className="input mx-auto input-bordered w-full max-w-xs mb-4"
          type="text"
          {...register("code", {})}
        />
        <button className="btn mx-auto  btn-wide" type="submit">
          Pradėti
        </button>
      </div>
    </form>
  );
}
