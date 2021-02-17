import React from 'react';

export interface InputCopyProps {
  value: string
}

export function InputCopy({ value }: InputCopyProps) {
  return (
    <div className="input-copy">
      <div className="input-copy__element">
        <label htmlFor="copy-api-key" className="input-copy__element--label">Your API Key:</label>
        <input type="text" name="copy" id="copy-api-key" className="input-copy__element--input" value={value} readOnly={true} />
      </div>
      <button className="input-copy__action">Copy</button>
    </div>
  );
}

export default InputCopy;
