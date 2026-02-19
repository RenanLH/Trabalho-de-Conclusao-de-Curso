import { useEffect, useState } from 'react';
import { User, Lock, Save, ShieldCheck } from 'lucide-react';
import Header from '../components/Header';
import { t } from 'i18next';
import i18n from '../i18n';

const Configuracoes = () => {
  const [activeTab, setActiveTab] = useState('perfil');
  const [nomeUsuario, setNomeUsuario] = useState<string>("");

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }

    let language = localStorage.getItem("language");
    if (language) {
      i18n.changeLanguage(language);
    }

    let nome = localStorage.getItem("nomeUsuario");
    if (nome) {
      setNomeUsuario(nome);
    }

  }, []);

  const disabledFunction = () => {
    return nomeUsuario.trim().length < 5;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950  ">
      <Header texto={t("Configuracoes")} />

      <div className="max-w-4xl mx-auto w-full rounded-2xl p-8 border mt-16
       dark:bg-slate-900 dark:text-slate-50 bg-white text-slate-900  border-slate-100 dark:border-slate-700">

        <div className="flex flex-col md:flex-row gap-8">
          {/* Navegação Lateral */}
          <aside className="w-full md:w-64 flex flex-row md:flex-col gap-2">
            <button
              onClick={() => setActiveTab('perfil')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'perfil'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
                }`}
            >
              <User size={20} /> Perfil
            </button>
            <button
              onClick={() => setActiveTab('seguranca')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'seguranca'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-900'
                }`}
            >
              <Lock size={20} /> Segurança
            </button>
          </aside>

          {/* Área de Conteúdo */}
          <main className="flex-1  dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">

            {activeTab === 'perfil' && (
              <section className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-6 mb-8">
                  <div>
                    <h2 className="text-xl font-bold dark:text-white">Informações Pessoais</h2>
                    <p className="text-sm text-slate-500">Atualize seu usuario.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700 :text-slate-300">Usuario</span>
                      <input
                        type="text"
                        value={nomeUsuario}
                        onChange={(e) => setNomeUsuario(e.target.value)}
                        placeholder="Seu nome"
                        className=" w-full pl-10 pr-4 py-3 text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 border-2 border-slate-400/20 rounded-xl placeholder:text-slate-400"
                      />
                    </label>

                  </div>
                  <button
                    disabled={disabledFunction()}
                    className={`flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 
                     text-white font-bold rounded-xl  transition-all active:scale-95
                     ${disabledFunction()
                        ? 'bg-slate-300 cursor-not-allowed shadow-none'
                        : ' bg-blue-600 hover:bg-blue-700'} 
                    `}>

                    <Save size={18} /> Salvar Alterações
                  </button>
                </div>
              </section>
            )}

            {activeTab === 'seguranca' && (
              <section className="animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3 mb-8">
                  <ShieldCheck className="text-blue-600" size={28} />
                  <div>
                    <h2 className="text-xl font-bold dark:text-white">Segurança da Conta</h2>
                    <p className="text-sm text-slate-500">Altere sua senha regularmente para sua proteção.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Senha Atual</span>
                    <input
                      type="password"
                      className=" w-full pl-10 pr-4 py-3 text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 border-2 border-slate-400/20 rounded-xl placeholder:text-slate-400"
                    />
                  </label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nova Senha</span>
                      <input
                        type="password"
                        className=" w-full pl-10 pr-4 py-3 text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 border-2 border-slate-400/20 rounded-xl placeholder:text-slate-400"
                      />
                    </label>
                    <label className="block">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirmar Nova Senha</span>
                      <input
                        type="password"
                        className=" w-full pl-10 pr-4 py-3 text-slate-700 dark:text-slate-50 bg-slate-50 dark:bg-slate-800 border-2 border-slate-400/20 rounded-xl placeholder:text-slate-400"
                      />
                    </label>
                  </div>

                  <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-100 dark:border-amber-900">
                    <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                      <strong>Dica:</strong> Uma senha forte deve conter letras maiúsculas, minúsculas, números e caracteres especiais.
                    </p>
                  </div>

                  <button className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all active:scale-95">
                    Atualizar Senha
                  </button>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;