import api from "../../services/axios";

const Home: React.FC = () => {
  const teste = () => {
    console.log("API TESTE");
    api.get("/health").then((response) => {
      console.log(response);
    });
  };
  return (
    <div>
      <div>🏠 Home Page</div>
      <button onClick={teste}>Click Me</button>
    </div>
  );
};

export default Home;
