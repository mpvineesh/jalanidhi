import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BillingsView } from 'src/sections/billing/view/billing-view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Billing - ${CONFIG.appName}`}</title>
      </Helmet>

      <BillingsView />
    </>
  );
}
