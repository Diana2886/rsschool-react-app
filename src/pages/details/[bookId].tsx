import { BookDetails, bookDetailsLoader } from '../../components/BookDetails';
import { FC } from 'react';
import { Book } from '../../services/bookApi/types';
import { GetServerSideProps } from 'next';

type BookDetailsPageProps = {
  book: Book;
};

const BookDetailsPage: FC<BookDetailsPageProps> = ({ book }) => {
  return <BookDetails book={book} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { bookId } = context.query;

  try {
    const book = await bookDetailsLoader(bookId as string);

    return {
      props: {
        book,
      },
    };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return {
      notFound: true,
    };
  }
};

export default BookDetailsPage;
