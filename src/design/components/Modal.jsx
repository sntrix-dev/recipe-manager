import { CloseIcon } from "../icons";

const Modal = ({ open, onClose, children }) => {
  return (
    <div
      className={`w-full h-screen bg-dark/25 z-50 fixed top-0 left-0 flex items-center justify-center transition-all duration-300 ease-in-out ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-light shadow-sm rounded-md py-6 px-10 min-w-[17rem] lg:w-1/2 relative"
      >
        <button className="absolute right-4 top-4" onClick={onClose}>
          <CloseIcon size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
