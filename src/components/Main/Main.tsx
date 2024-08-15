import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { useAppSelector } from '../../store/hooks';
import { StateFormData } from '../StateFormData';

export function Main() {
  const { uncontrolledFormData, hookFormData, recentlyEnteredData } = useAppSelector(
    (state: RootState) => state.form
  );
  const isRecentlyEnteredDataFromUncontrolledForm =
    recentlyEnteredData?.formType === 'uncontrolled';
  const isRecentlyEnteredDataFromHookForm = recentlyEnteredData?.formType === 'hook';

  console.log('uncontrolledFormData', uncontrolledFormData);
  console.log('hookFormData', hookFormData);
  return (
    <main>
      <h1>Main Page</h1>
      {/* <div
        style={{
          border: isRecentlyEnteredDataFromUncontrolledForm ? '2px solid green' : 'none',
        }}
      > */}
      <Link to="/uncontrolled-form">
        <h2>Uncontrolled Form</h2>
      </Link>
      {isRecentlyEnteredDataFromUncontrolledForm && <StateFormData data={uncontrolledFormData} />}
      {/* </div> */}
      {/* <div style={{ border: isRecentlyEnteredDataFromHookForm ? '2px solid blue' : 'none' }}> */}
      <Link to="/hook-form">
        <h2>Hook Form</h2>
      </Link>
      {isRecentlyEnteredDataFromHookForm && <StateFormData data={hookFormData} />}
      {/* </div> */}
    </main>
  );
}
