import { useEffect, useState } from 'react';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import s from './App.module.css';
import { Oval } from 'react-loader-spinner';
import { searchImages } from '../Services/GetImages';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Error from 'components/error/error';
function App() {
  // state = {
  //   categories: [],
  //   categoryName: '',
  //   page: 1,
  //   isShowModal: false,
  //   largeImg: '',
  //   totalHits: null,
  //   isLoading: false,
  //   error: false,
  // };
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [page, setPage] = useState(1);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!categoryName) {
      return;
    }
    getSearchPictures();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName, page]);

  const getSearchPictures = async () => {
    setIsLoading(true);
    try {
      const data = await searchImages(categoryName, page);
      if (data.total === 0) {
        throw new Error();
      }
      setCategories([...categories, ...data.hits]);
      setTotalHits(data.totalHits);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = () => {
    setPage(page + 1);
  };

  const userSearch = async search => {
    setCategoryName(search);
    setCategories([]);
    setPage(1);
    setError(false);
    setTotalHits(0);
  };

  const modalOpen = evt => {
    if (evt.target.nodeName === 'IMG') {
      setIsShowModal(true);
      setLargeImg(evt.target.alt);
      return;
    }
    return;
  };
  const modalCloseByEsc = e => {
    if (e.key === 'Escape') modalClose();
  };

  const handleModalClose = e => {
    if (e.currentTarget === e.target) {
      modalClose();
    }
  };

  const modalClose = e => {
    setIsShowModal(false);
    setLargeImg('');
  };

  return (
    <div className={s.app}>
      <Searchbar userSearch={userSearch} />
      <ImageGallery data={categories} modalOpen={modalOpen} />
      {categories.length < totalHits && totalHits && (
        <Button changePage={changePage} />
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
          handleModalClose={handleModalClose}
          modalCloseByEsc={modalCloseByEsc}
        />
      )}
      {error && <Error name={categoryName} />}
    </div>
  );
}

export default App;
