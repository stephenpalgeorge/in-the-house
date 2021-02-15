import * as React from 'react';
import { Stack } from '@in-the-house/ui';

export interface KeysProps {
  apiKey?: string,
}

export function Keys({ apiKey = '' }: KeysProps) {
  return (
    <Stack sectionName="keys">

    </Stack>
  )
}
