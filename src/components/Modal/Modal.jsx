import { Component } from 'react';
import s from './Modal.module.css';

class Modal extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.props.modalCloseByEsc);
  };
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.props.modalCloseByEsc);
  };

  render() {
    const { img, handleModalClose } = this.props;
    return (
      <div className={s.Overlay} onClick={e => handleModalClose(e)}>
        <div className={s.Modal}>
          <img src={img} alt={img} width="1024" />
        </div>
      </div>
    );
  }
}
export default Modal;
