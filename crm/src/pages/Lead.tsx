// import { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import TableOne from '../components/TableOne';
// import { ToastContainer, toast } from 'react-toastify';
// import axios from 'axios';

const Lead = () => {
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.BACKEND_URL}/users`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach the JWT token to the request
  //       },
  //     })
  //     .then((response: any) => {
  //       toast('User exits');
  //     })
  //     .catch((error: any) => {
  //       toast("User doesn't exit:");
  //     });
  // }, []);

  return (
    <>
      <Breadcrumb pageName="Lead" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </>
  );
};

export default Lead;
