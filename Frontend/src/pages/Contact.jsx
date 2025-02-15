import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "1c95dfbf-cc3f-42bb-a46a-f7ffb797e34c",
      name: data.username,
      email: data.email,
      message: data.message,
    };
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("An error occurred", error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-3xl p-10 space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-xl text-gray-600 mt-2">
            We are happy to connect with you   &#128525;
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-medium text-gray-800 mb-4">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Your Name"
                  className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-sm text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  className="w-full px-6 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register("message", { required: true })}
                />
                {errors.message && (
                  <span className="text-sm text-red-500 font-semibold">
                    This field is required
                  </span>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300 ease-in-out"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-medium text-gray-800 mb-4">
              Contact Information
            </h3>
            <ul className="space-y-6">
              <li className="flex items-center space-x-4 text-gray-700">
                <FaPhone className="text-indigo-600" />
                <span>+91 9956473021</span>
              </li>
              <li className="flex items-center space-x-4 text-gray-700">
                <FaEnvelope className="text-red-800" />
                <span>viewmyblog@.com</span>
              </li>
              <li className="flex items-center space-x-4 text-gray-700">
                <FaMapMarkerAlt className="text-green-600" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
