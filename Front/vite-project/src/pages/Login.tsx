import "../styles/Login.css";

const Login = () => {
  return (
    <div id="Login">
      <div
        className="container mt-4"
        style={{ width: "40%", alignContent: "center" }}
      >
        <h1
          style={{
            textAlign: "center",
            fontWeight: "bolder",
            marginBottom: "50px",
          }}
        >
          Login
        </h1>

        <form action="">
          <input
            style={{
              background: "lightgray",
              color: "GrayText",
              marginBottom: "20px",
              padding: "15px",
            }}
            className="form-control"
            type="text"
            placeholder="Email"
          />
          <input
            style={{
              background: "lightgray",
              color: "GrayText",
              marginBottom: "20px",
              padding: "15px",
            }}
            className="form-control"
            type="text"
            placeholder="Senha"
          />
          <input
            style={{
              backgroundColor: "black",
              color: "white",
              fontWeight: "bold",
              marginBottom: "50px",
              padding: "15px",
            }}
            className="form-control"
            type="submit"
            value="Entrar"
          />
        </form>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          style={{
            width: "fit-content",
            backgroundColor: "orangered",
            color: "white",
            padding: "15px",
          }}
          className="form-control"
          type="button"
          value="Entrar com Google"
        />
      </div>
    </div>
  );
};

export default Login;
