import ReactHook from "./reacthook";
import UserListing from "./UserListing";

const test = (Component) => {
  
    return (<>
    <Component/>
    </>
  )};

export default UserListing(test);