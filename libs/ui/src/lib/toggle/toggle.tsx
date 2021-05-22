import React from 'react';

/* eslint-disable-next-line */
export interface ToggleProps {
  label: string,
  description: string,
  initial: boolean,
  handleApiCall?: (e: React.ChangeEvent<HTMLInputElement>) => any,
}

export function Toggle({ label, description, initial, handleApiCall }: ToggleProps) {
  const [isOn, setIsOn] = React.useState<boolean>(initial);
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOn(!isOn);
    handleApiCall(e);
  }

  const inputName: string = label.split(' ').join('-').toLowerCase();
  return (
    <div className="toggle">
      <input type="checkbox" name={inputName} id={inputName} onChange={handleToggle} checked={isOn} />
      <label htmlFor={inputName}>
        <span className="name">{label}</span>
        <span className="description">{description}</span>
      </label>
    </div>
  );
}

export default Toggle;
