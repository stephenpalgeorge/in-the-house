import * as React from 'react';
import { Bar } from 'react-chartjs-2';

import { IRecord } from '@in-the-house/api-interfaces';
import { Stack } from '@in-the-house/ui';
import { fetchFromUser } from '../../fetch';
import { AuthContext } from '../../contexts/auth.context';
import { ModalsContext } from '../../contexts/modals.context';

export interface UsageProps {
  count?: number,
  usage: IRecord[],
  accountType?: [number, number],
}

export function Usage({ count = 0, usage = [], accountType = [0, 0] }: UsageProps) {
  const authContext = React.useContext(AuthContext);
  const modalsContext = React.useContext(ModalsContext);

  const [chartData, setChartData] = React.useState<any[]>([]);
  // utility variables:
  const months = [
    'January', 'February', 'March',
    'April', 'May', 'June',
    'July', 'August', 'September',
    'October', 'November', 'December'
  ];
  const limit: string = accountType[0] === 0 ? '250' : accountType[0] === 1 ? '3000' : 'unlimited';
  let limitClass: string;
  if (limit !== 'unlimited') {
    limitClass = usage.length >= Number(limit) * .9 ? 'high' : usage.length >= Number(limit) * .75 ? 'medium' : 'low';
  } else limitClass = 'unlimited';
  const currentMonth: string = months[new Date().getMonth()];

  const groupUsage = async (records: IRecord[], userId: string) => {
    const response = await fetchFromUser(authContext.accessToken, `/auth/user/${userId}/projects`, "POST");
    if (response.status === 'error') {
      modalsContext.addModal({
        name: 'Projects data error',
        code: 500,
        type: 'error',
        message: 'Couldn\'t fetch your projects, do you have any set up yet?',
        isDismissible: true,
      });
    } else {
      if (response.data.accessToken) authContext.setAccessToken(response.data.accessToken);
      if (response.data.projects) {
        // create array of projects - no duplicates - from the project ids that are present in the records
        // we do this as it is possible a user might have 'projects' that have not received any usage, and we don't
        // want to show those...
        const projects = [...new Set(records.map(r => r.project))].map(id => response.data.projects[response.data.projects.map(p => p.id).indexOf(id)]);
        // create datasets - each one will have a name, an array of records and a (empty for now) array of recordsByDay:
        const datasets = [];
        projects.forEach(project => {
          // it's possible the usage data will include records where the project ID is
          // an old or non-existant project...in that case, we don't include the data:
          if (!project) return;
          const current = project;
          datasets.push({
            name: current.origin,
            records: usage.filter(record => record.project === current.id),
            recordsByDay: [],
          });
        }
        );
        // update the recordsByDay of each dataset, result is an array with an index for each day of the month
        // at which is a number of records for that day:
        datasets.forEach(set => {
          for (let i = 1; i <= 31; i++) {
            set.recordsByDay.push(set.records.filter(record => record.day === i).length);
          }
        });
        // update state:
        setChartData(datasets);
      }
    }
  }

  // run the groupUsage function every time usage updates
  // at the moment, it doesn't update - but future dev might include
  // buttons to load in different time periods...
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
        project. The chart shows the number of API calls per day for the current month.
        You can toggle the data for different projects by clicking on their name in the legend.
        See when your keys are most active, and when you get close to your limit.
      </p>

      {
        count > 0 && <div className="usage-summary">
          <p className="font-family--serif">Total API calls for <mark>{currentMonth}, {new Date().getFullYear()}</mark>:</p>
          <p className={`usage-summary__numbers ${limitClass}`}>{count}<span>/{limit}</span></p>
          {
            limit !== 'unlimited' &&
            <progress max={limit} value={count}></progress>
          }
        </div>
      }

      <div className="chart">
        {
          usage.length === 0 ? (<p>No data to show...{count > 0 ? 'if you deleted a project, it\'s data will no longer be shown here, but will still be counted.' : ''}</p>) :
            ([
              <p key="chart-description" className="visuallyhidden" id="chart-description">
                This bar chart describes the user's usage per day of the API for the given month.
              </p>,
              <Bar key="bar-chart" data={{
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
              />
            ])
        }
      </div>
    </Stack>
  )
}
