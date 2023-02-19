import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from "react-hook-form";
import { UserRequest } from "../Types";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import { routes } from "../Common/routes";
import { useEffect, useState } from "react";

export default function RequestInfo() {
  const { user } = useAuth0();
  const { register, handleSubmit } = useForm();
  const [alreadyRegistered, setAlreadyRegistered] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    UserService.getUserByAuthId(user?.sub!).then((res) => {
      setAlreadyRegistered(res.length !== 0 ? true : false);
    });
  }, []);

  if (alreadyRegistered) {
    navigate(routes.mainPage);
  }

  const onSubmit = (formData: any) => {
    const request: UserRequest = {
      ...formData,
      authId: user?.sub!,
    };

    UserService.createUser(request).then(() => navigate(routes.mainPage));
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-center text-3xl font-bold mt-6 mb-6">
          Sveiki prisijungę!
        </h1>
        <h1 className="card-title text-center text-3xl font-bold mt-6 mb-6">
          Prieš pradedant mums reikia šiek tiek daugiau informacijos apie jus!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <input
              placeholder="Vardas"
              className="input mx-auto input-bordered w-full max-w-xs mb-4"
              type="text"
              {...register("firstName", {})}
            />
            <input
              placeholder="Pavarde"
              className="input mx-auto input-bordered w-full max-w-xs mb-4"
              type="text"
              {...register("lastName", {})}
            />
            <input
              placeholder="Udgymo įstaiga"
              className="input mx-auto input-bordered w-full max-w-xs mb-4"
              type="text"
              {...register("institution", {})}
            />
            <input
              placeholder="El. paštas"
              className="input mx-auto input-bordered w-full max-w-xs mb-4"
              type="email"
              {...register("email", {})}
            />
            <div className="card-actions justify-end"></div>
            <button className="btn mx-auto  btn-wide" type="submit">
              Kurti
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
