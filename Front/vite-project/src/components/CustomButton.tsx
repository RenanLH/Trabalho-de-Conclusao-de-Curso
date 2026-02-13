type buttonProps = {
  disabledFunction : () => boolean;
  buttonText: string;
}

const CustomButton = (props:buttonProps) =>{
    const {disabledFunction, buttonText}  = props
    return (
        <div className="flex justify-end notranslate">
            <button
              disabled = {disabledFunction()}
              className={`
                flex items-center gap-2 px-6 py-3 text-sm font-bold text-white rounded-lg
                transition-all duration-200 transform active:scale-95
                ${disabledFunction() 
                  ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                  : 'bg-green-600 hover:bg-green-700 hover:shadow-green-200/50 focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                }
              `}
              type="submit"
            >
              <span>{buttonText}</span>
            </button>
          </div> 

)}

export default CustomButton;
