import { useState } from "react";

const SupportPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support request submitted:", form);
    alert("Your support request has been submitted!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 pt-[6vh]">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Customer Support</h1>
        <p className="text-gray-600 mt-2">
          Need help? Contact us or check our FAQs below.
        </p>
      </div>

      {/* Quick Support Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-blue-700">Live Chat</h3>
          <p className="text-sm text-gray-600 mt-2">Chat with Shekhar 24/7</p>
          <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Start Chat
          </button>
        </div>
        <div className="bg-green-50 border border-green-200 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-green-700">Call Mahesh</h3>
          <p className="text-sm text-gray-600 mt-2">Available anytime</p>
          <p className="text-md font-bold mt-2 text-green-700">
            +61 123 456 789
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-yellow-700">
            Email Support
          </h3>
          <p className="text-sm text-gray-600 mt-2">Get a reply immidiately</p>
          <p className="text-md font-bold mt-2 text-yellow-700">
            shekhar@gmail.com
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Send us a message
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-700">
              How can I track my order?
            </h3>
            <p className="text-sm text-gray-600">
              Go to "My Orders" page and click on "Track Order".
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">
              What is your refund policy?
            </h3>
            <p className="text-sm text-gray-600">I dont know ask Shekhar</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">
              How can I contact support?
            </h3>
            <p className="text-sm text-gray-600">
              You can email, call, or use the live chat option above.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
