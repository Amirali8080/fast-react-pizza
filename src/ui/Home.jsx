import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="center my-10 px-4 text-center">
      <h1 className="text-ston mb-10 text-center text-xl font-semibold md:text-3xl">
        The best pizza.
        <br />
        <span className=" text-yellow-600">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="menu" type="primary">
          continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
