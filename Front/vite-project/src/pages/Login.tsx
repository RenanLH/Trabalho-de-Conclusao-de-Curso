const Login = () => {
  return (
    <div id="Login">
      <div className="container mt-4 w-2/4" 
        style={{ width: "40%" }}>
        <h1 className="text-center mb-12">Login</h1>
        <form action="" onSubmit={(e) => e.preventDefault()}>
          
          <input className="mb-3 p-3 w-full rounded bg-gray-300"
            type="text"
            placeholder="Email"
          />
          
          <input className="mb-5 p-3 w-full rounded bg-gray-300"
            type="text"
            placeholder="Senha"
          />
          
          <input
            className="mb-4 p-3 w-full rounded text-white bg-black"
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
