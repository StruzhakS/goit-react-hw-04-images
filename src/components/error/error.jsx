import s from './error.module.css';
const Error = ({ name }) => {
  return (
    <h2 className={s.Error}>
      Search by query <span className={s.text}>{name}</span> did not produce
      results
    </h2>
  );
};
export default Error;
