import { FC, PropsWithChildren, useEffect, useRef } from 'react';

type ModalProps = {
  open: boolean;
  className?: string;
  onCancel?: () => void;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({ open, children, className, onCancel }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = dialogRef.current;

    if (open) {
      modal?.showModal();
    } else {
      modal?.close();
    }
  }, [open]);

  return <dialog ref={dialogRef} className={className} onCancel={onCancel}>
    {children}
  </dialog>;
}

export default Modal;
