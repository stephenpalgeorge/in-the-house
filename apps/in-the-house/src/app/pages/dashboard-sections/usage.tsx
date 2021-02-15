import * as React from 'react';

import { IRecord } from '@in-the-house/api-interfaces';
import { Stack } from '@in-the-house/ui';

export interface UsageProps {
  usage: IRecord[],
}

export function Usage({ usage = [] }: UsageProps) {
  return (
    <Stack sectionName="usage">
      <h2>Your API Usage</h2>
      <p>
        Below you can see how your API Keys are being used, broken down by 
        project. See when your keys are most active, and when you get close 
        to your limit.
      </p>

      <div className="chart">
        {
          usage.length === 0 &&
          <p>No data to show...</p>
        }
      </div>
    </Stack>
  )
}
