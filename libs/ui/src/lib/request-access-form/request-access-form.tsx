import React from 'react';
import { Icon, IconsRow } from '../icons-row/icons-row';

export interface RequestAccessFormProps {
  icons?: Icon[],
}

export function RequestAccessForm({ icons }: RequestAccessFormProps) {
  return (
    <div className="form signup-form">
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
