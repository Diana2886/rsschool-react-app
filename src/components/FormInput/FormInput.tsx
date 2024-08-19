import { FC } from 'react';
import { FormInputProps } from './types';

export const FormInput: FC<FormInputProps> = ({
  id,
  name,
  type,
  label,
  value,
  error,
  options,
  accept,
  register,
  registerKey,
}) => (
  <>
    <div>
      {type === 'select' && (
        <div className="form-field">
          <label htmlFor={id}>{label}</label>
          <select
            className="input-field"
            id={id}
            value={value}
            {...(name ? { name } : {})}
            {...(register && registerKey && register(registerKey))}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && <small>{error}</small>}
        </div>
      )}
      {(type === 'text' ||
        type === 'number' ||
        type === 'email' ||
        type === 'password' ||
        type === 'file') && (
        <div className="form-field">
          <label htmlFor={id}>{label}</label>
          <input
            className="input-field"
            id={id}
            type={type}
            value={value}
            accept={accept}
            {...(name ? { name } : {})}
            {...(register && registerKey && register(registerKey))}
          />
          {error && <small>{error}</small>}
        </div>
      )}
      {(type === 'radio' || type === 'checkbox') && (
        <div className="form-field_inline">
          <input
            id={id}
            type={type}
            value={value}
            accept={accept}
            {...(name ? { name } : {})}
            {...(register && registerKey && register(registerKey))}
          />
          <label htmlFor={id}>{label}</label>
        </div>
      )}
    </div>
  </>
);
