import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ children, onOpen, open }) {
  return (
    <>
      <div className="backdrop" onClick={() => onOpen(() => false)}></div>

      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">Modal Title{console.log(open)}</h2>
          <button className="modal__close" onClick={() => onOpen(() => false)}>
            <XCircleIcon className="icon close" />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
export default Modal;
