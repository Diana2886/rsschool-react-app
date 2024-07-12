import { FC, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Book, BookData } from '../../services/types';
import { Loader } from '../Loader';
import { BookDetailsProps } from './types';

export const BookDetails: FC<BookDetailsProps> = ({ onClose }) => {
  const query = new URLSearchParams(location.search);
  const bookId = query.get('details');
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (bookId) {
      const fetchBookDetails = async () => {
        setIsLoading(true);
        try {
          const response = await api.fetchBookDetails(bookId);
          if (response.ok) {
            const data: BookData = await response.json();
            setBook(data.book);
          } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
          }
        } catch (error) {
          console.error('An error occurred while fetching book details:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchBookDetails();
    }
  }, [bookId]);

  return (
    <div className="book-details">
      <button onClick={onClose}>Close</button>
      {isLoading ? (
        <Loader />
      ) : (
        book && (
          <div>
            <h2>{book.title}</h2>
            <p>Year of publication: {book.publishedYear || ''}</p>
            <p>Pages number: {book.numberOfPages || ''}</p>
            <p>eBook: {book.ebook ? 'available' : 'not available'}</p>
            <p>Audiobook: {book.audiobook ? 'available' : 'not available'}</p>
          </div>
        )
      )}
    </div>
  );
};
