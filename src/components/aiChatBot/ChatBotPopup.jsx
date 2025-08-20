import React, { useState } from "react";
import { BiSupport } from "react-icons/bi";
import Chatbot from "./ChatBot.jsx";

const ChatBotPopup = ({ user }) => {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-900 text-white shadow-lg hover:bg-blue-700"
      >
        <BiSupport size={28} />
      </button>

      {/* Pass state to ChatBot */}
      <Chatbot isOpen={open} onOpenChange={setOpen} user={user} />
    </>
  );
};

export default ChatBotPopup;
