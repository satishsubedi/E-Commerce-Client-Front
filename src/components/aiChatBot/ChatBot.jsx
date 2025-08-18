const apiBaseUrl = import.meta.env.VITE_APP_API_BASE_URL;
import { Button } from "@/components/ui/button";
import { IoMdSend } from "react-icons/io";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLayoutEffect, useRef, useState } from "react";

const initialBotMessage = {
  from: "bot",
  text: "Hello! I am AI assistant for Group Project. How can I help you today?",
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

const ChatBot = ({ isOpen, onOpenChange }) => {
  const [messages, setMessages] = useState([initialBotMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Send message function
  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessages = [
      ...messages,
      { from: "user", text: input, time: currentTime },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${apiBaseUrl}/api/v1/user/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.from === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      const botTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.message, time: botTime },
      ]);
    } catch (err) {
      console.error(err);
      const botTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error contacting AI.", time: botTime },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to bottom on new message
  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Clear chat function
  const clearChat = () => setMessages([initialBotMessage]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <DialogHeader className="p-4 rounded-md bg-blue-500">
          <DialogTitle className="text-center text-white">
            🤖AI Support
          </DialogTitle>
          <DialogDescription className="text-center text-white">
            Ask anything, we’re here to help.
          </DialogDescription>
        </DialogHeader>

        {/* Chat Area */}
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <div
              ref={scrollRef}
              className="h-[300px] w-full p-4 overflow-y-auto flex flex-col gap-3"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.from === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div className={`flex items-start gap-2`}>
                    {msg.from === "bot" && (
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="AI Bot"
                        />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`px-2 py-2 rounded-lg text-sm max-w-[75%] ${
                        msg.from === "user"
                          ? "bg-blue-400 text-white"
                          : "bg-gray-200 text-gray-900"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <div className="relative w-full p-2">
          <Textarea
            placeholder="Type your message..."
            className="w-full pr-12 resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button
            onClick={sendMessage}
            disabled={loading}
            className="absolute right-2 bottom-2 p-2 rounded-full bg-transparent hover:bg-gray-200 text-blue-600"
          >
            {loading ? "..." : <IoMdSend size={20} />}
          </Button>
        </div>

        {/* Footer */}
        <DialogFooter className="p-4 border-t flex justify-between gap-2">
          <Button variant="destructive" onClick={clearChat}>
            Clear Chat
          </Button>
          <DialogClose asChild>
            <Button variant="outline">End Chat</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatBot;
