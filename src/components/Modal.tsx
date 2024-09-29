import { FC, PropsWithChildren, ReactElement, useEffect, useMemo, useRef } from 'react';
import './Modal.scss';
import CloseIcon from './CloseIcon';

type ModalProps = {
  open: boolean;
  title?: string;
  header?: ReactElement;
  className?: string;
  onCancel?: () => void;
};

const Modal: FC<PropsWithChildren<ModalProps>> = ({ open, title, children, className: _className, header, onCancel }) => {
  const className = useMemo(() => ['modal', ...(_className?.split(' ') ?? [])].join(' '), [_className]);
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
    <div className='modal__body'>
      <div className='modal__header'>
        {title && <h1 className='modal__title'>{title}</h1>}
        {header}
        <button className='modal__close' onClick={() => onCancel?.()} aria-label='Close commendations modal'>
          <CloseIcon />
        </button>
      </div>
      <div className='modal__content'>
        {children}
      </div>
    </div>
  </dialog>;
}

export default Modal;
