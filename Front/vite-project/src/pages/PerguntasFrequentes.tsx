import { useTranslation } from "react-i18next";
import Duvida from "../components/Duvida";
import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../util/config";
import NovaFaq from "./NovaFaq";
import { isAdmin } from "../util/util"
import FloatingMenu from "../components/FloatingMenu";
import { CircleQuestionMark } from "lucide-react";
import CustomNotification from "../components/CustomNotification";

type QaA = {
  _id: string,
  pergunta: string,
  resposta: string,
};

const PerguntasFrequentes = () => {
  const { t, i18n } = useTranslation();
  const [duvidas, setDuvidas] = useState<QaA[]>([]);
  const [showNewFaq, setShowNewFaq] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [showDeleteMode, setShowDeleteMode] = useState<boolean>(false);
  const [showEditMode, setShowEditMode] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {

    let theme = sessionStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    let language = sessionStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }

    getQuestions();

  }, []);

  const toggleSelection = (id: number) => {
    const newSelection = new Set(selectedIds);

    if (showDeleteMode && !showEditMode) {
      if (newSelection.has(id)) {
        newSelection.delete(id);
      } else {
        newSelection.add(id);
      }
    }
    else if (showEditMode && !showDeleteMode){
        newSelection.clear();
        newSelection.add(id);
    }

    setSelectedIds(newSelection);
  };

  const confirmBulkDelete = async () => {
    const idsParaDeletar = duvidas.filter((_, index) => selectedIds.has(index)).map((item) => item._id);
    console.log("Deletando itens:", idsParaDeletar);
    setSelectedIds(new Set());


    // Aqui você chama sua API Node.js passando a lista de IDs
    // Após o sucesso:
    setDuvidas(duvidas.filter((_, index) => !selectedIds.has(index)));
    setShowDeleteMode(false);
  };

  const showError = () => {
    setNotification(true);
    setShowNewFaq(false);
    setShowDeleteMode(false);
  }

  async function getQuestions() {
    const url = `${API_BASE_URL}/duvidas`;

    setDuvidas([]);

    await axios.get(url).then((res) => {

      if (res.status == 200 || res.status == 304) {
        const resultArray = res.data as QaA[];

        resultArray.map((it, _index) => {
          const duvida = { _id: it._id, pergunta: it.pergunta, resposta: it.resposta };
          setDuvidas((prev) => [duvida, ...prev]);
        });

      }
      setLoaded(true);
    }).catch(() => {
      setLoaded(true);
    });


  }

  return (
    <div className="bg-gray-100 dark:bg-slate-800/80 min-h-screen">
      <Header texto={t("Perguntas_Frequentes")} />
      {
        loaded && duvidas.length ? (
          <div className="flex flex-col items-center mt-12 w-full max-w-5xl mx-auto px-4">

            {/* Barra de Ações em Massa (Aparece apenas no modo delete) */}

            {showEditMode && (
              <div className="w-full mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-900 flex justify-between items-center animate-in fade-in slide-in-from-top-4">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Selecione somente um:
                </span>
                <div className="flex gap-2 notranslate">
                  <button
                    onClick={() => setShowEditMode(false)}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  >
                    {t("Cancelar")}
                  </button>
                  <button
                    disabled={selectedIds.size === 0}
                    onClick={confirmBulkDelete}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg shadow-lg shadow-red-500/20 transition-all">
                    Editar
                  </button>
                </div>
              </div>
            )}


            {showDeleteMode && (
              <div className="w-full mb-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-blue-200 dark:border-blue-900 flex justify-between items-center animate-in fade-in slide-in-from-top-4">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  {selectedIds.size} itens selecionados
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowDeleteMode(false)}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    disabled={selectedIds.size === 0}
                    onClick={confirmBulkDelete}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-lg shadow-lg shadow-red-500/20 transition-all"
                  >
                    Excluir Selecionados
                  </button>
                </div>
              </div>
            )}

            <ul className="container mx-auto">
              
              {duvidas.map((item, index) => (
                <li key={index} className="flex items-center gap-4 group">
                  {/* Checkbox animado que aparece no modo delete */}
                  {showEditMode && (
                    <div className="animate-in zoom-in duration-300">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(index)}
                        onChange={() => toggleSelection(index)}
                        className="w-6 h-6 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all"
                      />
                    </div>
                  )}

                  {showDeleteMode && (
                    <div className="animate-in zoom-in duration-300">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(index)}
                        onChange={() => toggleSelection(index)}
                        className="w-6 h-6 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-all"
                      />
                    </div>
                  )}

                  {/* Seu componente de Duvida existente */}
                  <div className={`flex-1 transition-all duration-300 ${selectedIds.has(index) ? 'opacity-50 scale-[0.98]' : ''}`}>
                    <Duvida question={item.pergunta} answer={item.resposta} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : loaded && (
          <div>
            <h1 className="p-4 text-slate-900 dark:text-white text-center text-4xl">
              Nenhuma pergunta frequente encontrada.
            </h1>
          </div>
        )
      }
      {
        isAdmin() && <div>
          <CustomNotification isOpen={notification} type={"error"} mensagem={"Erro de comunicação com o servidor"} onCancel={() => setNotification(!notification)} onLogin={false} onConfirm={() => setNotification(!notification)} />

          <FloatingMenu mainIcon={CircleQuestionMark}
            onAdd={() => setShowNewFaq(true)}
            onEdit={() => { setShowEditMode(true); setShowDeleteMode(false); setSelectedIds(new Set()) }}
            onDelete={() => { setShowDeleteMode(true); setShowEditMode(false); setSelectedIds(new Set()) }}
            showAdd={isAdmin()} showEdit={isAdmin()} showDelete={isAdmin()} />
        </div>
      }
      {
        showNewFaq &&
        <NovaFaq showComponent={setShowNewFaq} showError={showError} />
      }


    </div>
  );
};

export default PerguntasFrequentes;
