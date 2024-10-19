import { FC } from 'react';
import Modal from './Modal';
import './LoggedOutModal.scss';

type LoggedOutModalProps = {
  open: boolean;
  closeClick?: () => void;
};

const LoggedOutModal: FC<LoggedOutModalProps> = ({ open, closeClick }) => {
  return <Modal open={open} title='Logged Out!' className='modal logged-out-modal' onCancel={() => closeClick?.()}>
    <p className='logged-out-modal__message'>You are logged out of <a href="https://seaofthieves.com" target='_blank'>https://seaofthieves.com</a>.<br/>Please log in before refreshing.</p>
    <footer className='logged-out-modal__footer'>
      <a className='button button--secondary' href="https://seaofthieves.com" target="_blank">Go to seaofthieves.com</a>
    </footer>
  </Modal>;
}

export default LoggedOutModal;
