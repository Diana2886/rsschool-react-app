import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useEffect, useState } from 'react';
import { clearNewSubmissionId } from '../../store/formSlice';
import { FormType } from './constants';
import { FormSection } from '../FormSection';
import './Main.css';

export function Main() {
  const dispatch = useAppDispatch();
  const { controlledFormSubmissions, uncontrolledFormSubmissions, newSubmissionId } =
    useAppSelector((state: RootState) => state.form);
  const [highlightedId, setHighlightedId] = useState<number | null>(null);

  useEffect(() => {
    if (newSubmissionId) {
      setHighlightedId(newSubmissionId);
      const timer = setTimeout(() => {
        setHighlightedId(null);
        dispatch(clearNewSubmissionId());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [newSubmissionId, dispatch]);

  return (
    <main>
      <h1>Main Page</h1>
      <div className="main-content">
        <FormSection
          formType={FormType.CONTROLLED}
          submissions={controlledFormSubmissions}
          highlightedId={highlightedId}
        />
        <FormSection
          formType={FormType.UNCONTROLLED}
          submissions={uncontrolledFormSubmissions}
          highlightedId={highlightedId}
        />
      </div>
    </main>
  );
}
