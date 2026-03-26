import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const ContactForm = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        () => {
          toast.success("Message sent successfully ✅");
          formRef.current.reset();
        },
        (error) => {
          toast.error("Failed to send ❌");
        }
      );
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] text-black dark:text-white rounded-2xl shadow-xl p-8">

      <h2 className="text-2xl font-bold mb-6">Send Message</h2>

      <form ref={formRef} onSubmit={sendEmail} className="space-y-4">

        <input
          name="user_name"
          placeholder="Your Name"
          className="w-full p-3 rounded-xl border dark:bg-[#1e293b]"
          required
        />

        <input
          name="user_email"
          placeholder="Your Email"
          className="w-full p-3 rounded-xl border dark:bg-[#1e293b]"
          required
        />

        <textarea
          name="message"
          placeholder="Message"
          rows="5"
          className="w-full p-3 rounded-xl border dark:bg-[#1e293b]"
          required
        />

        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#615fff] to-blue-600 text-white font-semibold">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;