import React from 'react';

export interface InputCopyProps {
  copyCallback?(): any,
  value: string,
}

export function InputCopy({ copyCallback, value }: InputCopyProps) {
  const copyInputRef = React.useRef<HTMLInputElement>(null);
  const copy = () => {
    if (/iPad|iPhone|iPod/.test(navigator.platform)) {
      // this block should run if user is on iOS:
      const range = document.createRange();
      range.selectNodeContents(copyInputRef.current);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      copyInputRef.current.setSelectionRange(0, 999);
    } else {
      // if not on iOS, everything is much simpler:
      copyInputRef.current.select();
    }
    // in either case, then run the 'copy' command, and invoke the 
    // copyCallback function if one has been provided:
    document.execCommand('copy');
    if (copyCallback) copyCallback();
  }

  return (
    <div className="input-copy">
      <div className="input-copy__element">
        <label htmlFor="copy-api-key" className="input-copy__element--label">Your API Key:</label>
        <input
          ref={copyInputRef}
          type="text"
          name="copy"
          id="copy-api-key"
          className="input-copy__element--input"
          value={value}
          readOnly={true}
        />
      </div>
      <button onClick={copy} className="input-copy__action">Copy</button>
    </div>
  );
}

export default InputCopy;
