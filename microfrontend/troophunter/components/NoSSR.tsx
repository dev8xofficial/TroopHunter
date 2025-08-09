import React from 'react';

import dynamic from 'next/dynamic';

const NoSSR = ({ children }: { children: React.ReactNode }): JSX.Element => <>{children}</>;

export default dynamic(async () => await Promise.resolve(NoSSR), {
  ssr: false
});
