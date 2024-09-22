import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../features/contacts/contactsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the validation schema using Yup
const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Imię może zawierać tylko litery i spacje")
    .required("Wypełnienie pola jest obowiązkowe")
    .min(3, "Minimalna liczba znaków to 3")
    .max(50, "Maksymalna liczba znaków to 50"),
  number: Yup.string()
    .matches(/^\d+(-\d+){0,2}$/, "Number moze zawierac tylko cyfry i myslniki")
    .required("Wypełnienie pola jest obowiązkowe")
    .min(3, "Minimalna liczba znaków to 3")
    .max(50, "Maksymalna liczba znaków to 50"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.contacts.error);

  // Handle form submission
  const handleAdd = async (values, { resetForm }) => {
    try {
      const resultAction = await dispatch(
        addContact({
          name: values.name,
          number: values.number,
        })
      );

      if (addContact.fulfilled.match(resultAction)) {
        toast.success("Contact added successfully.");
        resetForm();
      } else {
        toast.error(resultAction.payload || "Failed to add contact.");
      }
    } catch (error) {
      console.error("Error adding contact:", error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={ContactFormSchema}
      onSubmit={handleAdd}
    >
      {() => (
        <div className={css.formContainer}>
          <Form>
            <div className={css.formGroup}>
              <label>
                Name
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
              </label>
            </div>
            <div className={css.formGroup}>
              <label>
                Number
                <Field type="tel" name="number" />
                <ErrorMessage name="number" component="div" />
              </label>
            </div>
            <div className={css.buttonContainer}>
              <button type="submit" className={css.button}>
                Add contact
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
