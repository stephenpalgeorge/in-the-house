import React from 'react';

export interface UserInfoProps {
  editable: boolean,
  label: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  type?: 'text'|'number'|'radio'|'checkbox'|'password',
  value: string,
}

export function UserInfo({ editable, label, setValue, type = 'text', value }: UserInfoProps) {
  const slugify = (string: string): string => string.toLowerCase().split(' ').join('-');
  const machineLabel = slugify(label);

  return editable ? (
    <div className="user-info">
      <label htmlFor={machineLabel}>{ label }</label>
      <input
        type={type}
        name={machineLabel}
        id={machineLabel}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
    </div>
  ) : (
    <div className="user-info">
      <p className="label">{ label }</p>
      <p className="input">{ value }</p>
    </div>
  );
}

export default UserInfo;
