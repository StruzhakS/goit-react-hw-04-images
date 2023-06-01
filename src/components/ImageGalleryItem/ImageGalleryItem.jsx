import { nanoid } from 'nanoid';
import s from './ImageGalleryItem.module.css';
import propTypes from 'prop-types';

const ImageGalleryItem = data => {
  return (
    <li key={nanoid()} className={s.ImageGalleryItem}>
      <img
        className={s.ImageGalleryItemImage}
        src={data.webformatURL}
        alt={data.largeImageURL}
        loading="lazy"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: propTypes.number.isRequired,
  largeImageURL: propTypes.string.isRequired,
  webformatURL: propTypes.string.isRequired,
};

export default ImageGalleryItem;
