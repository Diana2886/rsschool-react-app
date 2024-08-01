import { ReactElement } from 'react';
import { BookDetails } from '../../components/BookDetails';
import { Book } from '../../services/bookApi/types';
import { GetServerSideProps } from 'next';
import { MainLayout } from '@/layouts/MainLayout';
import { getBookDetails } from '@/services/getBookDetails';
import { BookDetailsLayout } from '@/layouts/BookDetailsLayout';

type BookDetailsPageProps = {
  book: Book;
};

const BookDetailsPage = ({ book }: BookDetailsPageProps) => {
  return <BookDetails book={book} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { bookId } = context.query;

  try {
    const book = await getBookDetails(bookId as string);

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

BookDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <BookDetailsLayout>{page}</BookDetailsLayout>
    </MainLayout>
  );
};

export default BookDetailsPage;
