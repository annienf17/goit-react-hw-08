import * as Yup from "yup";

const ApiSchema = Yup.object().shape({
  endpoint: Yup.string().url("Invalid URL").required("Endpoint is required"),
  method: Yup.string()
    .oneOf(["GET", "POST", "PUT", "PATCH", "DELETE"], "Invalid HTTP method")
    .required("HTTP method is required"),
  headers: Yup.object().shape({
    Authorization: Yup.string().required("Authorization header is required"),
  }),
  body: Yup.object(),
});

export default ApiSchema;
