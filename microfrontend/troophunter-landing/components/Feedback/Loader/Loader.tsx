import React from 'react';

import Image from 'next/image';

import { getTroopHunterPublicUrl } from '../../../utils/helpers';

const Loader = (): JSX.Element => {
  return (
    <>
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen touch-none flex-col items-center justify-center bg-white">
        <Image className="mx-auto !h-8 lg:!h-10 2xl:!h-12" src={`${getTroopHunterPublicUrl()}/logo/logo.svg`} alt="TroopHunter" width={50} height={50} style={{ width: 'auto', height: 'auto' }} />
      </div>
    </>
  );
};

export default Loader;
