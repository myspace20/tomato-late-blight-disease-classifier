import client from "prom-client";

const collectDefaultMetrics = client.collectDefaultMetrics;
const Registry = client.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

export const httpRequestCounter = new client.Counter({
  name: "disease_classifier_api_http_request_count",
  help: "Count of HTTP requests made to ",
  labelNames: ["method", "route", "statusCode"],
});
register.registerMetric(httpRequestCounter);

export const httpRequestsInMilliSeconds = new client.Histogram({
  name: "disease_classifier_api_http_request_duration_milliseconds",
  help: "Duration of HTTP requests in milliseconds.",
  labelNames: ["method", "route", "code"],
});

register.registerMetric(httpRequestsInMilliSeconds);

export const sigupCounter = new client.Counter({
  name: "disease_classifier_api_user_signup_count",
  help: "Count of user signups",
});

register.registerMetric(sigupCounter);

export const scanCounter = new client.Counter({
  name: "disease_classifier_api_scan_count",
  help: "Count of threads created",
});

register.registerMetric(scanCounter);

export default register;
