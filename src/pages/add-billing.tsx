import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { BillingAddView } from 'src/sections/billing/billing-add';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Billing - ${CONFIG.appName}`}</title>
      </Helmet>

      <BillingAddView />
    </>
  );
}
