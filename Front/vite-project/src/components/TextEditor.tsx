import React, { useState, useRef } from "react";

const TextEditor: React.FC = () => {
const [text, setText] = useState("");
const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Função para aplicar formatação no texto selecionado
const applyFormat = (format: string) => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end) return; // Não faz nada se nenhum texto estiver selecionado

    let selectedText = text.substring(start, end);
    let formattedText = selectedText;

    if (format === "bold") {
      formattedText = `**${selectedText}**`;
    } else if (format === "italic") {
      formattedText = `_${selectedText}_`;
    } else if (format === "link") {
      formattedText = `[${selectedText}](https://exemplo.com)`;
    }

    // Atualiza o texto mantendo o restante inalterado
    const newText = text.substring(0, start) + formattedText + text.substring(end);
    setText(newText);

    // Mantém o cursor na posição original
    setTimeout(() => {
      textarea.selectionStart = start;
      textarea.selectionEnd = start + formattedText.length;
      textarea.focus();
    }, 0);
  };

  return (
    <div className="max-w-1/3 w-full p-4 bg-blue-700 text-white rounded-md">
      {/* Toolbar */}
      <div className="flex space-x-2 mb-2 border-b border-gray-700 pb-2">
        <button
          onClick={() => applyFormat("bold")}
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded"
        >
          <b>B</b>
        </button>
        <button
          onClick={() => applyFormat("italic")}
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded"
        >
          <i>I</i>
        </button>
        <button
          onClick={() => applyFormat("link")}
          className="p-2 bg-gray-800 hover:bg-gray-700 rounded"
        >
          🔗
        </button>
      </div>

      {/* Área de Texto */}
      <textarea
        ref={textAreaRef}
        className="w-full h-40 text-black border-gray-600 p-2 rounded-md focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};

export default TextEditor;