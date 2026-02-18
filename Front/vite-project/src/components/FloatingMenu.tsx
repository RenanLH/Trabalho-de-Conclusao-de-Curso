import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Trash2, LucideIcon, Settings2, Plus } from 'lucide-react';

interface FloatingMenuProps {
  mainIcon?: LucideIcon;
  addIcon?: LucideIcon;
  editIcon?: LucideIcon;
  deleteIcon?: LucideIcon;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  showAdd: boolean;
  showEdit: boolean;
  showDelete: boolean;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({
  onAdd,
  onEdit,
  onDelete,
  showAdd, showDelete, showEdit,
  mainIcon: MainIcon = Settings2,
  addIcon: AddIcon = Plus,
  editIcon: EditIcon = Pencil,
  deleteIcon: DeleteIcon = Trash2 }) => {

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={`fixed right-6 top-1/2 -translate-y-1/2 flex flex-col-reverse items-end z-[100] transition-all duration-500 ease-in-out 
        ${isOpen ? 'translate-x-[-10px]' : 'translate-x-[45px]'}`}>
      <div className="relative flex items-center justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-500/20 transition-transform duration-300 
            ${isOpen ? ' scale-110' : 'rotate-0'}`}>
          {MainIcon && <MainIcon size={24} />}
        </button>
      </div>

      <div className={`flex flex-col-reverse items-end gap-4 mb-4 transition-all duration-300 
        ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-10'}`}>

        {
          showAdd &&
          <div className="relative flex items-center justify-end group">
            <span className="absolute right-full mr-3 bg-slate-800 dark:bg-slate-700 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Adicionar
            </span>
            <button
              onClick={() => { onAdd(); setIsOpen(false); }}
              className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all hover:scale-110 active:scale-95">
              {AddIcon && <AddIcon size={20} />}
            </button>
          </div>

        }
        {
          showEdit &&
          <div className="relative flex items-center justify-end group">
            <span className="absolute right-full mr-3 bg-slate-800 dark:bg-slate-700 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Editar
            </span>
            <button
              onClick={() => { onEdit(); setIsOpen(false); }}
              className="p-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg transition-all hover:scale-110 active:scale-95">
              {EditIcon && <EditIcon size={20} />}
            </button>
          </div>
        }
        {/* Excluir */}
        {showDelete &&
          <div className="relative flex items-center justify-end group">
            <span className="absolute right-full mr-3 bg-slate-800 dark:bg-slate-700 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Excluir
            </span>
            <button
              onClick={() => { onDelete(); setIsOpen(false); }}
              className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all hover:scale-110 active:scale-95">
              {DeleteIcon && <DeleteIcon size={20} />}

            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default FloatingMenu;