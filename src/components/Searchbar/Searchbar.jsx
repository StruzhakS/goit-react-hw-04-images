import { useState } from 'react';
import s from './Searchbar.module.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '250px',
  position: 'center-top',
  distance: '75px',
  timeout: '2000',
});

function Searchbar({ userSearch }) {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (userInput) {
      userSearch(userInput);
      setUserInput('');
      return;
    }
    Notiflix.Notify.info('Please enter a picture name');
  };

  const handleInput = e => {
    setUserInput(e.currentTarget.value.toLowerCase());
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={e => handleSubmit(e)}>
        <input
          onChange={handleInput}
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={userInput}
        />
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
}

export default Searchbar;
