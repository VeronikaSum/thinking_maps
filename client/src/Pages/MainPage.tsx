import { useNavigate } from "react-router-dom";
import { routes } from "../Common/routes";
import { useAuth0 } from "@auth0/auth0-react";

export default function MainPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <div className="flex flex-col w-full lg:flex-row">
        {isAuthenticated && (
          <>
            <div className="grid flex-grow h-32 card rounded-box place-items-center">
              <h1 className="text-center text-3xl font-bold mt-6 mb-6">
                Sukurkite savo žemėlapį
              </h1>
              <button
                className="btn btn-primary"
                onClick={() => navigate(routes.createPage)}
              >
                Kurti
              </button>
              <h1 className="text-center text-3xl font-bold mt-6 mb-6">
                Rinkitės iš jau sukurtų
              </h1>
              <button
                className="btn btn-primary"
                onClick={() => navigate(routes.browse)}
              >
                Rinktis
              </button>
            </div>
            <div className="divider lg:divider-horizontal" />
          </>
        )}
        <div className="grid flex-grow h-32 card rounded-box place-items-center">
          <h1 className="text-center text-3xl font-bold mt-6 mb-6">
            Pradėkite žaisti
          </h1>
          <button
            className="btn btn-primary"
            onClick={() => navigate(routes.gamePageSelect)}
          >
            Žaisti
          </button>
        </div>
      </div>
    </>
  );
}
