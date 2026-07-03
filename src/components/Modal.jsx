import { XCircleIcon } from "@heroicons/react/24/outline";

function Modal({ children, setIsOpen, isOpen }) {
  return (
    <>
      {isOpen && (
        <div>
          <div className="backdrop"></div>

          <div className="modal">
            <div className="modal__header">
              <h2 className="modal__title">Modal Title{console.log(isOpen)}</h2>
              <button
                className="modal__close"
                onClick={() => setIsOpen((is) => !is)}
              >
                <XCircleIcon className="icon close" />
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
export default Modal;
