import * as React from 'react';
import { Bar } from 'react-chartjs-2';

import { IRecord } from '@in-the-house/api-interfaces';
import { Stack } from '@in-the-house/ui';
import { fetchFromUser } from '../../fetch';
import { AuthContext } from '../../contexts/auth.context';
import { ModalsContext } from '../../contexts/modals.context';

export interface UsageProps {
  usage: IRecord[],
}

export function Usage({ usage = [] }: UsageProps) {
  const authContext = React.useContext(AuthContext);
  const modalsContext = React.useContext(ModalsContext);

  const [chartData, setChartData] = React.useState<any[]>([]);

  const groupUsage = async (records: IRecord[], userId: string) => {
    const response = await fetchFromUser(authContext.accessToken, `/auth/user/${userId}/projects`, "POST");
    if (response.status === 'error') {
      modalsContext.addModal({
        name: 'Projects data error',
        code: 500,
        type: 'error',
        message: 'Couldn\'t fetch your projects...',
        isDismissible: true,
      });
    } else {
      if (response.data.accessToken) authContext.setAccessToken(response.data.accessToken);
      if (response.data.projects) {
        // create array of projects - no duplicates
        const projects = [...new Set(records.map(r => r.project))].map(id => response.data.projects[response.data.projects.map(p => p.id).indexOf(id)]);
        // create datasets - each one will have a name and an array of records:
        const datasets = [];
        projects.forEach(project => {
          const current = project || { origin: undefined, id: undefined };
          datasets.push({
            name: current.origin,
            records: usage.filter(record => record.project === current.id),
            recordsByDay: [],
          });
        }
        );

        // update the recordsByDay of each dataset:
        datasets.forEach(set => {
          for (let i = 1; i <= 31; i++) {
            set.recordsByDay.push(set.records.filter(record => record.day === i).length);
          }
        });
        setChartData(datasets);
        console.log(datasets);
      }
    }
  }

  React.useEffect(() => {
    if (authContext.user._id && authContext.user._id.length > 0) {
      groupUsage(usage, authContext.user._id);
    }
  }, [usage]);

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
          usage.length === 0 ? (<p>No data to show...</p>) :
            (<Bar data={{
              labels: [...Array(32).keys()].slice(1),
              datasets: chartData.map(set => {
                return {
                  label: set.name,
                  data: set.recordsByDay,
                  backgroundColor: 'rgba(0, 0, 0, .4)',
                  borderColor: 'rgba(0, 0, 0, 1)',
                  borderWidth: 2,
                }
              }),
            }}
              options={{
                scales: {
                  yAxes: [{ ticks: { beginAtZero: true, stepSize: 1 } }]
                }
              }}
            />)
        }
      </div>
    </Stack>
  )
}
