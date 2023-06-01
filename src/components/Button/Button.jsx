import s from './Button.module.css';

const Button = ({ changePage }) => {
  return (
    <button className={s.moreButton} type="button" onClick={changePage}>
      Load more
    </button>
  );
};
export default Button;
