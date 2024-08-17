import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FormSectionProps } from './types';
import { FormType } from '../Main/constants';
import { FormsStateData } from '../FormsStateData';
import { EmptyData } from '../EmptyData';
import './FormSection.css';

export const FormSection: FC<FormSectionProps> = ({ formType, submissions, highlightedId }) => {
  const formTypeTitle = formType === FormType.CONTROLLED ? 'Controlled Form' : 'Uncontrolled Form';

  return (
    <div className="form-section">
      <Link to={`/${formType.toLowerCase()}-form`}>
        <h2>{formTypeTitle}</h2>
      </Link>
      {submissions.length > 0 ? (
        submissions.map((submission) => (
          <FormsStateData key={submission.id} data={submission} highlightedId={highlightedId} />
        ))
      ) : (
        <EmptyData formType={formType} />
      )}
    </div>
  );
};
