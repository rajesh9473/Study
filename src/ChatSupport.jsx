import React from "react";
import { Textarea } from "@material-tailwind/react";

const ChatSupport = () => {
  return (
    <section className=" p-5 sm:p-5 lg:p-10 mt-5 ">
      <div className="relative">
        <div id="message-list"></div>
        {/* Type chat  */}
        <div className="fixed bottom-0 w-[95%] mb-2">
          <div className=" flex items-center">
            <Textarea
              variant="outlined"
              label="Type a message"
              className="!min-h-0 !h-12"
            />
            <div className="p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#2196f3"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatSupport;
