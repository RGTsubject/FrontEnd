import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

// styles
import { ModalContainer } from '@/styles/styles';

interface ModalType {
  children: React.ReactNode;
  modal: boolean;
  openModal: () => void;
}

const Modal = ({ children, openModal }: ModalType) => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = document.querySelector(
      '#modal-container'
    ) as HTMLElement | null;

    setModalRoot(root);
  }, []);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <ModalContainer>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* 모달 헤더 */}
        <div className="modalHeader">
          <div onClick={openModal}>
            <span className="close"> X </span>
          </div>
        </div>
        {/* 모달 컨텐츠 부분 */}
        {children}
        {/*  */}
      </div>
    </ModalContainer>,
    modalRoot
  );
};

export default Modal;
