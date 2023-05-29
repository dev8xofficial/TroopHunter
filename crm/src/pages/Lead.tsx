import Breadcrumb from '../components/Breadcrumb';
import TableOne from '../components/TableOne';
import DefaultLayout from '../layout/DefaultLayout';

const Lead = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Lead" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default Lead;
