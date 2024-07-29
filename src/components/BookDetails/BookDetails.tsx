import { FC } from 'react';
import { Book } from '../../services/bookApi/types';
import { useLoaderData } from 'react-router-dom';
import './BookDetails.scss';
import { getEntriesString, hasEntries } from './helpers';
import { usePage } from '../../hooks/usePage';
import { useCloseDetails } from '../../hooks/useCloseDetails';

export const BookDetails: FC = () => {
  const {
    title,
    publishedYear,
    numberOfPages,
    ebook,
    audiobook,
    authors,
    artists,
    editors,
    publishers,
    characters,
  } = useLoaderData() as Book;

  const page = usePage();
  const { closeDetails } = useCloseDetails(page);

  const entries = [
    { label: 'Authors', data: authors, string: getEntriesString(authors) },
    { label: 'Artists', data: artists, string: getEntriesString(artists) },
    { label: 'Editors', data: editors, string: getEntriesString(editors) },
    { label: 'Publishers', data: publishers, string: getEntriesString(publishers) },
    { label: 'Characters', data: characters, string: getEntriesString(characters) },
  ];

  const handleClose = () => {
    closeDetails();
  };

  return (
    <div className="book-details-container" data-testid="details">
      <button className="button button-close" data-testid="close-button" onClick={handleClose}>
        ✖
      </button>
      <div className="book-details">
        <h2 className="book-details-title">{title}</h2>
        {publishedYear && <p>Year of publication: {publishedYear}</p>}
        {numberOfPages && <p>Number of pages: {numberOfPages}</p>}
        <p>eBook: {ebook ? 'available' : 'not available'}</p>
        <p>Audiobook: {audiobook ? 'available' : 'not available'}</p>
        {entries.map(
          ({ label, data, string }) =>
            hasEntries(data) && (
              <p key={label}>
                {label}: {string}
              </p>
            )
        )}
      </div>
    </div>
  );
};
