import { useState } from 'react';
import Rating from './Rating';
import axios from "axios";
import Loader from "react-loader-spinner";

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleOpen = () => {
    setOpen((prevState) => !prevState);
    setTimeout(() => {
      setEmail("");
      setMessage("");
      setRating(0);
      setSubmitted(false);
    }, 200);
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
   }


  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "feedback", email, message, rating })
    })
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <div class="fixed h-11 w-11 bg-indigo-500 bottom-7 right-5 sm:bottom-10 sm:right-10 rounded-full cursor-pointer text-white flex items-center justify-center" onClick={toggleOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path class={`${open? "opacity-100" : "opacity-0"} transition-opacity`} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          <path class={`${open? "opacity-0" : "opacity-100"} transition-opacity`} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      </div>
      <div class={`${open? "opacity-100" : "opacity-0"} transition-opacity duration-200 flex flex-col justify-center fixed w-11/12 bottom-20 sm:bottom-20 sm:right-20 bg-white z-50 px-6 py-7 rounded-md bg-gray-600 shadow-lg sm:w-72`}>
        {submitted? (
          <div class={`h-64 flex flex-col justify-between`}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 self-center" fill="none" viewBox="0 0 24 24" stroke="#34d399">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-white font-semibold text-lg">Thank you for submitting your feedback!</p>
            <p class="text-white">We will be reaching out shortly.</p>
          </div>
        ) : (
          <div>
          <p class="font-semibold mb-5 text-lg text-white flex flex-row">
            We would
            <span class="flex items-center mx-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="red">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
              </svg>
            </span>
            your feedback!
          </p>
          <form onSubmit={onSubmit} class="space-y-10 sm:space-y-4">
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-white">Email</label>
              <div class="mt-1">
                <input class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md pl-2 h-9" value={email} name="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
            </div>
            <div class="space-y-2">
              <label for="rating" class="block text-sm font-medium text-white">Rate your experience</label>
              <Rating value={rating} maxRating={5} setRating={setRating} />
            </div>
            <div class="space-y-2">
              <label for="message" class="block text-sm font-medium text-white">Message</label>
              <div class="mt-1">
                <textarea value={message} for="message" id="message" name="message" rows="4" class="py-2 px-3 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md resize-none" onChange={(e) => setMessage(e.target.value)}></textarea>
              </div>
            </div>
            <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {loading? (
                <Loader type="Oval" color="white" height={20} width={20} />
              ) : (
              <span>
                Submit
              </span>
              )}
            </button>
          </form>
        </div>
        )}
      </div>
    </>
  );
};

export default Feedback;
