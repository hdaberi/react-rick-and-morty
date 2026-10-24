import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ title, children, open, onOpen }) {
  if (!open) return null;
  return (
    <>
      <div className="backdrop" onClick={() => onOpen(false)}></div>
      <div className="modal">
        <div className="modal__header">
          <h2 className="title">{title}</h2>
          <button>
            <XCircleIcon className="icon close" onClick={() => onOpen(false)} />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}

export default Modal;
