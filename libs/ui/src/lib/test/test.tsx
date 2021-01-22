import React from 'react';

import './test.module.scss';

/* eslint-disable-next-line */
export interface TestProps {
  name: string,
}

export function Test(props: TestProps) {
  return (
    <div>
      <h1>Welcome, {props.name}</h1>
    </div>
  );
}

export default Test;
