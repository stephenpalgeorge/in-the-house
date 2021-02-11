import React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon, IconsRow } from '../icons-row/icons-row';

export interface RequestAccessFormProps {
  closeForm?(): any,
  icons?: Icon[],
}

export function RequestAccessForm({ closeForm, icons }: RequestAccessFormProps) {
  const history = useHistory();
  const handleClose = () => closeForm ? closeForm() : history.goBack();

  return (
    <div className="form signup-form">
      <button className="close-signup-form" onClick={handleClose}>
        <div className="cross-bar"></div>
        <div className="cross-bar"></div>
      </button>
      <p className="form-title">Request access</p>
      <p className="color--light">
        "In the House" is still in development. If you'd like beta access, 
        to try out the api, help us test it or just get early, free access 
        to the current data points, just get in touch with us:
      </p>

      {
        (icons && icons.length > 0) &&
        <IconsRow icons={ icons } />
      }
    </div>
  );
}

export default RequestAccessForm;
