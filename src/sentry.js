import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://95620c79f89191d0046ef736463c1b1a@o4507973738496000.ingest.us.sentry.io/4507975590150144",
  intergrations: [new BrowserTracing()],
  environment: "production",
});
