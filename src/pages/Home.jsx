import Banner from "../components/Banner";
import PopularServices from "../components/PopularServices";

const Home = () => {
  return (
    <div>
      <div className="pt-3">
        <Banner />
        <PopularServices />
      </div>
    </div>
  );
};

export default Home;
