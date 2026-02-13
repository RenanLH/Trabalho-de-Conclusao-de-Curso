import React from 'react';

interface ModalProps {
  isOpen: boolean;
  type: 'success' | 'error';
  titulo?: string;
  mensagem: string;
  onConfirm?: () => void;
  onCancel: () => void;
  onLogin?: boolean;
}

const Notification: React.FC<ModalProps> = ({
  isOpen,
  type,
  titulo,
  mensagem,
  onConfirm,
  onCancel,
  onLogin
}) => {
  if (!isOpen) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      />
      <div className={`
        relative w-full max-w-sm transform overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-900 p-6 shadow-2xl transition-all
        scale-100 opacity-100 animate-in fade-in zoom-in duration-300
      `}>

        <div className={`
          mx-auto flex h-16 w-16 items-center justify-center rounded-full mb-4
          ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}
        `}>
          {isSuccess ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          )}
        </div>

        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">
            {titulo || (isSuccess ? 'Sucesso!' : 'Algo deu errado')}
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300 leading-relaxed">
            {mensagem}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2">

          <div className="flex gap-2">
            {onLogin && (
              <button
                onClick={() => { window.location.href = "/login"; }}
                className="flex-1 py-2 text-xs font-bold text-blue-600 dark:text-slate-50 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg transition-all border border-transparent hover:border-blue-100"
              >
                Ir para Login
              </button>
            )}
          </div>

          <button
            onClick={onConfirm}
            className={`
              w-full py-2.5 rounded-xl font-bold text-white 
              ${isSuccess ? 'bg-green-600 hover:bg-green-700 ' : 'bg-blue-600 hover:bg-blue-700 '}
              shadow-lg active:scale-[0.98]`}>
            Entendido
          </button>


        </div>
      </div>
    </div>
  );
};

export default Notification;