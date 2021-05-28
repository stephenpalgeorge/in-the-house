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
  const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOn(!isOn);
    if (handleApiCall) {
      setIsDisabled(true);
      await handleApiCall(e);
      setIsDisabled(false);
    }
  }

  React.useEffect(() => {
    setIsOn(initial);
  }, [initial]);

  const inputName: string = label.split(' ').join('-').toLowerCase();
  return (
    <div className={`toggle ${isDisabled ? 'disabled' : ''}`}>
      <input type="checkbox" name={inputName} id={inputName} onChange={handleToggle} checked={isOn} disabled={isDisabled} />
      <label htmlFor={inputName}>
        <span className="name">{label}</span>
        <span className="description">{description}</span>
      </label>
    </div>
  );
}

export default Toggle;
