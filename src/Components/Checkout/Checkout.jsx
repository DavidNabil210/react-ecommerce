import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Checkout() {
  const initialValues = {
    fullName: "",
    email: "",
    address: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    address: Yup.string().required("Address is required"),
  });

  const handleSubmit = (values) => {
    console.log("Checkout Data:", values);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <Field
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block mb-1 font-medium">Address</label>
                <Field
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
