import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserAddView } from 'src/sections/user/user-add';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserAddView />
    </>
  );
}
