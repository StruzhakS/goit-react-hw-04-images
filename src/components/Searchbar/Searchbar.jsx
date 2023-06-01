import { Component } from 'react';
import s from './Searchbar.module.css';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '250px',
  position: 'center-top',
  distance: '75px',
  timeout: '2000',
});

class Searchbar extends Component {
  state = {
    userInput: '',
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.userInput) {
      this.props.onSubmit(this.state.userInput);
      this.setState({ userInput: '' });
      return;
    }
    Notiflix.Notify.info('Please enter a picture name');
  };

  handleInput = e => {
    this.setState({ userInput: e.currentTarget.value.toLowerCase() });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={e => this.handleSubmit(e)}>
          <input
            onChange={this.handleInput}
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.userInput}
          />
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
        </form>
      </header>
    );
  }
}
export default Searchbar;
