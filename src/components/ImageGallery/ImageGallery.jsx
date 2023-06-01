import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ data, modalOpen }) => {
  return (
    <ul className={s.ImageGallery} onClick={e => modalOpen(e)}>
      {data.map(({ id, largeImageURL, webformatURL }) => (
        <ImageGalleryItem
          id={id}
          largeImageURL={largeImageURL}
          webformatURL={webformatURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
