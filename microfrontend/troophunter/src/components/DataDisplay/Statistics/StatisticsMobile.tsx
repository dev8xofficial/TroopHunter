import React from 'react';

import { type IStatisticsProps, type IStats } from './Statistics.interfaces';

const StatisticsMobile: React.FC<IStatisticsProps> = ({ statistics }: IStatisticsProps): JSX.Element => {
  return (
    <>
      <div className="hidden overflow-hidden">
        <div className="overflow-auto">
          <ol role="list" className="mb-1 grid w-full grid-flow-col grid-rows-1 divide-x bg-white">
            {statistics.map((stat: IStats) => (
              <li key={stat.name} className="w-fit border-b px-6 py-4">
                <div className="flex items-center justify-center">
                  <div className="ml-4 whitespace-nowrap text-sm font-medium text-gray-500 hover:text-gray-700">
                    {stat.amount} {stat.name}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default StatisticsMobile;
