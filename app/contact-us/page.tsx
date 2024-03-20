"use client";

import React from "react";

function Contact() {
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <section className="p-3 border-b-2 border-border bg-muted flex justify-center w-full">
        <p className="text-lg">Contact us</p>
      </section>

      <div className="mx-auto max-w-[700px] flex flex-col gap-4 px-2.5 py-5">
        <p className="">
          Shades of shape is dedicated to users like you. Please feel free to send us any concerns, questions, or just
          general inquiries and we will get back to you as soon as we can.
        </p>
        <p className="">You can also contact us via email at: contact@shadesofshape.com</p>

        <form className="flex flex-col gap-3" onSubmit={(e) => sendMessage(e)}>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="">First name</p>
              <input
                type="text"
                className="border-border focus:outline-primary rounded-md border-[1px] h-[45px] w-full px-2.5"
              />
            </div>

            <div className="flex-1">
              <p className="">Last name</p>
              <input
                type="text"
                className="border-border focus:outline-primary rounded-md border-[1px] h-[45px] w-full px-2.5"
              />
            </div>
          </div>

          <div className="">
            <p className="">Company</p>
            <input
              type="text"
              className="border-border focus:outline-primary rounded-md border-[1px] h-[45px] w-full px-2.5"
            />
          </div>

          <div className="">
            <p className="">Email</p>
            <input
              type="text"
              className="border-border focus:outline-primary rounded-md border-[1px] h-[45px] w-full px-2.5"
            />
          </div>

          <div className="">
            <p className="">Subject</p>
            <input
              type="text"
              className="border-border focus:outline-primary rounded-md border-[1px] h-[45px] w-full px-2.5"
            />
          </div>

          <div className="">
            <p className="">Message</p>
            <textarea rows={5} className="border-border focus:outline-primary rounded-md border-[1px] w-full p-2.5" />
          </div>

          <button type="submit" className="bg-primary rounded-md resize-none text-white h-[45px] w-[150px]">
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
