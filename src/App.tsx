import "react-toastify/dist/ReactToastify.min.css";

import RoutesMain, { RoutesAdmin } from "./routes";


function AppMain() {
  return (
    <div className="App">
      <RoutesMain></RoutesMain>
    </div>
  );
}
export function AdminMain() {
  return (
    <div className="App">
      <RoutesAdmin></RoutesAdmin>
    </div>
  );
}

export default AppMain;
