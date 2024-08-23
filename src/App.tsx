import axios from "axios";
import { useState } from "react";
import "./App.css";

type GithubData = {
  name: string;
  bio: string;
  avatar_url: string;
};

function App() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("Loading...");
  const [bio, setBio] = useState("Loading...");
  const [avatar_url, setAvatarURL] = useState("Loading...");
  const [error, setError] = useState(""); // Novo estado para mensagem de erro

  const handlePesquisa = () => {
    axios
      .get<GithubData>(`https://api.github.com/users/${username}`)
      .then((response) => {
        setName(response.data.name);
        setBio(response.data.bio);
        setAvatarURL(response.data.avatar_url);
        setError(""); // Limpa qualquer mensagem de erro anterior
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setError("Usuário não encontrado."); // Define a mensagem de erro se o usuário não for encontrado
          setName("");
          setBio("");
          setAvatarURL("");
        } else {
          setError("Ocorreu um erro. Por favor, tente novamente."); // Mensagem genérica para outros erros
        }
      });
  };

  return (
    <div className="container-geral">
      <div className="container">
      <header className="header-top">| GITHUB |</header>


        <main>
          <div className="form">
            <h1>Consumindo API do Github</h1>
            <input
              type="text"
              placeholder="Digite o usuário"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handlePesquisa}>Procurar</button>
          </div>
          <div className="conteudo">
            {error && <p className="error-message">{error}</p>} {/* Exibe a mensagem de erro */}
            {!error && (
              <div>
                <img src={avatar_url} alt="" />
                <h1>{name}</h1>
                <p>{bio}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
