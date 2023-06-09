import { IStatisticsProps, IStats } from './Statistics.interfaces';

const Statistics: React.FC<IStatisticsProps> = ({ statistics }: IStatisticsProps): JSX.Element => {
  return (
    <>
      <div className="z-10 col-span-12 rounded-t-md border border-b-0 shadow xl:col-span-8 xl:block">
        <dl className="mx-auto grid grid-cols-4 gap-px divide-x sm:grid-cols-4 lg:grid-cols-4">
          {statistics.map((stat: IStats) => (
            <div key={stat.name} className="flex flex-wrap items-baseline justify-between px-3 py-4 sm:px-4 xl:px-6">
              <dd className="w-full flex-none text-xl font-medium leading-10 tracking-tight text-gray-900 md:text-2xl xl:text-3xl">{stat.amount}</dd>
              <dt className="text-xs font-medium text-gray-500 md:text-sm md:leading-6">{stat.name}</dt>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
};

export default Statistics;
