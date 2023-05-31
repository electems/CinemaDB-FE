import 'react-toastify/dist/ReactToastify.min.css'

import RoutesMain, { RoutesAdmin } from './routes'

function AppMain () {
  const path = window.location.pathname
  if (!path.includes('admin')) {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        ></link>
        <RoutesMain></RoutesMain>
      </div>
    )
  } else {
    return <div></div>
  }
}
export function AdminMain () {
  const path = window.location.pathname
  if (path.includes('admin')) {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        ></link>
        <RoutesAdmin></RoutesAdmin>
      </div>
    )
  } else {
    return <div></div>
  }
}
export default AppMain
