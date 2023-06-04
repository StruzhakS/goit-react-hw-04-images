import { useEffect } from 'react';
import s from './Modal.module.css';

function Modal({ handleModalClose, modalCloseByEsc, img }) {
  useEffect(() => {
    window.addEventListener('keydown', modalCloseByEsc);
    return () => {
      window.removeEventListener('keydown', modalCloseByEsc);
    };
  });

  return (
    <div className={s.Overlay} onClick={e => handleModalClose(e)}>
      <div className={s.Modal}>
        <img src={img} alt={img} width="1024" />
      </div>
    </div>
  );
}
export default Modal;
