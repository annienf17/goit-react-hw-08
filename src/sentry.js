import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://7c8bfa0ac3b6b9a44b8e0b4645dbb253@o4507973738496000.ingest.us.sentry.io/4507975133364224",
  intergrations: [new BrowserTracing()],
  environment: "production",
});
