import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import Cadastro from "./pages/Cadastro";
import PerguntasFrequentes from "./pages/PerguntasFrequentes";
import Topico from "./pages/Topico";
import Login from "./pages/Login";
import Mensagens from "./pages/MesagemList";
import MensagemPage from "./pages/Mensagem";
import NovaMensagem from "./pages/NovaMensagem";
import Forum_NovoTopico from "./pages/NovoTopico";
import Configuracoes from "./pages/Configuracoes";

function App() {
  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/duvidas" element={<PerguntasFrequentes />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/buscar" element={<Forum />} />
          <Route path="/forum/novo" element={<Forum_NovoTopico />} />
          <Route path="/topico/:id" element={<Topico />} />
          <Route path="/mensagens" element={<Mensagens />} />
          <Route path="/mensagem/:id" element={<MensagemPage />} />
          <Route path="/mensagem/nova" element={<NovaMensagem/>}/>
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/config" element={<Configuracoes />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
