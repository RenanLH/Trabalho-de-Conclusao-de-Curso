import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import Cadastro from "./pages/Cadastro";
import PerguntasFrequentes from "./pages/PerguntasFrequentes";
import Topico from "./pages/Topico";
import Login from "./pages/Login";
import Mensagens from "./pages/Mesagens";
import Mensagem from "./pages/Mensagem";
import NovaMensagem from "./pages/NovaMensagem";

function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/duvidas" element={<PerguntasFrequentes />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/mensagens" element={<Mensagens />} />
          <Route path="/mensagem/:id" element={<Mensagem />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/topico/:id" element={<Topico />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home />} />
          <Route path="/mensagem/nova" element={<NovaMensagem/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
