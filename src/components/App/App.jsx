import { Component } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import s from './App.module.css';
import { Oval } from 'react-loader-spinner';
import { searchImages } from '../Services/GetImages';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Error from 'components/error/error';
class App extends Component {
  state = {
    categories: [],
    categoryName: '',
    page: 1,
    isShowModal: false,
    largeImg: '',
    totalHits: null,
    isLoading: false,
    error: false,
  };

  componentDidUpdate = (_, prevState) => {
    if (
      prevState.categoryName !== this.state.categoryName ||
      prevState.page !== this.state.page
    )
      this.getSearchPictures();
    if (prevState.categoryName === this.state.categoryName) {
    }
  };

  getSearchPictures = async () => {
    this.setState({ isLoading: true });
    try {
      const data = await searchImages(this.state.categoryName, this.state.page);
      this.setState({
        categories: [...this.state.categories, ...data.hits],
        totalHits: data.totalHits,
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  userSearch = search => {
    this.setState({ categoryName: search });
    this.setState(prev =>
      prev.categoryName === this.state.categoryName
        ? this.changePage
        : { categories: [], page: 1, error: false, totalHits: 0 }
    );
  };

  modalOpen = evt => {
    if (evt.target.nodeName === 'IMG') {
      this.setState({ isShowModal: true, largeImg: evt.target.alt });
      return;
    }
    return;
  };

  modalCloseByEsc = e => {
    if (e.key === 'Escape') this.modalClose();
  };

  handleModalClose = e => {
    if (e.currentTarget === e.target) {
      this.modalClose();
    }
  };

  modalClose = e => {
    this.setState({ isShowModal: false, largeImg: '' });
  };

  render() {
    const {
      categories,
      totalHits,
      categoryName,
      largeImg,
      isShowModal,
      isLoading,
      error,
    } = this.state;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.userSearch} />
        <ImageGallery data={categories} modalOpen={this.modalOpen} />
        {categories.length < totalHits && totalHits && (
          <Button changePage={this.changePage} />
        )}

        <div className={s.loader}>
          {isLoading && (
            <Oval
              style={{
                textAlign: 'center',
                marginLeft: '250px',
              }}
              ariaLabel="loading-indicator"
              height={300}
              width={300}
              strokeWidth={20}
              strokeWidthSecondary={2}
              color="blue"
              secondaryColor="white"
            />
          )}
        </div>
        {isShowModal && (
          <Modal
            img={largeImg}
            handleModalClose={this.handleModalClose}
            modalCloseByEsc={this.modalCloseByEsc}
          />
        )}
        {error && <Error name={categoryName} />}
      </div>
    );
  }
}
export default App;
