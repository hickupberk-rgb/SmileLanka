import { useEffect, useRef, useState } from "react";
import { Mail, MessageSquare, Send, X } from "lucide-react";

const defaultMessages = [
  {
    id: "welcome",
    sender: "agent",
    text: "Hello! Need help with booking or travel plans? Send us a message and our support team will reply soon.",
  },
];

const LiveChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem("smilelanka_live_chat");
      return stored ? JSON.parse(stored) : defaultMessages;
    } catch {
      return defaultMessages;
    }
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    try {
      localStorage.setItem("smilelanka_live_chat", JSON.stringify(messages));
    } catch {
      // ignore storage failures
    }
  }, [messages]);

  const toggleOpen = () => {
    setOpen((value) => !value);
  };

  const clearChat = () => {
    setMessages(defaultMessages);
  };

  const handleSend = (event) => {
    event.preventDefault();

    const text = draft.trim();
    if (!text) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
    };

    setMessages((current) => [...current, userMessage]);
    setDraft("");

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `agent-${Date.now()}`,
          sender: "agent",
          text: "Thanks for your message! Our support team will contact you shortly.",
        },
      ]);
    }, 900);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[96vw] max-w-[360px] rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-xl text-white ring-1 ring-white/10">
          <div className="flex items-center justify-between rounded-t-3xl bg-slate-900 px-4 py-3">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-amber-300">Live Support</p>
              <h3 className="text-base font-semibold">Chat with Smile Lanka</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={clearChat}
                className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200 transition hover:bg-white/10"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={toggleOpen}
                aria-label="Close chat"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-200 transition hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="max-h-[430px] space-y-3 overflow-y-auto px-4 py-4 text-sm text-slate-200 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "agent" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`rounded-3xl px-4 py-3 shadow-sm ${
                    message.sender === "agent"
                      ? "bg-slate-800 text-slate-100"
                      : "bg-amber-400 text-slate-950"
                  } max-w-[85%]`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSend} className="rounded-b-3xl bg-slate-900 px-4 py-4">
            <label htmlFor="live-chat-input" className="sr-only">
              Type your message
            </label>
            <div className="flex gap-2">
              <input
                id="live-chat-input"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              />
              <button
                type="submit"
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 transition hover:bg-amber-300"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={toggleOpen}
        className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-2xl transition hover:bg-amber-300"
      >
        <MessageSquare size={18} />
        {open ? "Hide chat" : "Live Chat"}
      </button>
    </div>
  );
};

export default LiveChatWidget;
