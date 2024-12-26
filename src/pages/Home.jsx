import Banner from "../components/Banner";
import PopularServices from "../components/PopularServices";
import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("Home");
  return (
    <>
      <div className="pt-3">
        <Banner />
        <PopularServices />
      </div>
    </>
  );
};

export default Home;
