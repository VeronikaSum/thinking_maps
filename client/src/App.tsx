import MapCreatePage from "./Pages/MapCreatePage";
import MainPage from "./Pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoPage from "./Pages/NoPage";
import { routes } from "./Common/routes";
import Navbar from "./Components/Navbar";
import BrowseMaps from "./Pages/BrowseMaps";
import Profile from "./Components/userInfo/Profile";
import RequestInfo from "./Pages/RequestInfo";
import { GamePage } from "./Game/GamePage";
import GameSelectionPage from "./Pages/GameSelectionPage";
import GameDetailsView from "./Pages/GameDetailsView";
import GroupViewPage from "./Pages/GroupViewPage";
import GamesViewPage from "./Pages/GamesViewPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-purple-200 min-h-screen pb-16">
        <Routes>
          <Route path={routes.mainPage} element={<MainPage />} />
          <Route path={routes.gamePage} element={<GamePage />} />
          <Route path={routes.createPage} element={<MapCreatePage />} />
          <Route path={routes.browse} element={<BrowseMaps />} />
          <Route path={routes.profile} element={<Profile />} />
          <Route path={routes.requestInfo} element={<RequestInfo />} />
          <Route path={routes.gamePageSelect} element={<GameSelectionPage />} />
          <Route path={routes.gameDetails} element={<GameDetailsView />} />
          <Route path={routes.gameDetailsView} element={<GamesViewPage />} />
          <Route path={routes.groupDetails} element={<GroupViewPage />} />
          <Route path={routes.notFoundPage} element={<NoPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
