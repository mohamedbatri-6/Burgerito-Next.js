"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { X, MessageSquare, Send } from "lucide-react"; // optionnel si tu as lucide-react

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [wsReady, setWsReady] = useState(false);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);
  const [messages, setMessages] = useState([
    { from: "support", text: "Bonjour 👋 Comment puis-je vous aider ?", ts: Date.now() },
  ]);

  const wsRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("wss://echo.websocket.events");
    wsRef.current = ws;

    ws.addEventListener("open", () => setWsReady(true));

    ws.addEventListener("message", (evt) => {
      const txt = typeof evt.data === "string" ? evt.data : "";
      if (!txt || txt.includes("sponsored")) return;

      // Réception = message “support”
      setMessages((prev) => [...prev, { from: "support", text: txt, ts: Date.now() }]);
      if (!open) setUnread((u) => u + 1);
    });

    ws.addEventListener("close", () => setWsReady(false));
    ws.addEventListener("error", () => setWsReady(false));

    return () => ws.close();
  }, [open]);

  // Scroll auto sur le dernier message
  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
      setUnread(0);
    }
  }, [open, messages]);

  const disabled = useMemo(() => !input.trim() || !wsReady, [input, wsReady]);

  function sendMsg() {
    const txt = input.trim();
    if (!txt || !wsRef.current || wsRef.current.readyState !== 1) return;

    // On affiche immédiatement mon message
    setMessages((prev) => [...prev, { from: "me", text: txt, ts: Date.now() }]);

    // Envoi au serveur (qui nous le renverra en “support”)
    wsRef.current.send(txt);
    setInput("");
  }

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 rounded-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white shadow-lg flex items-center gap-2"
        aria-label="Ouvrir le chat support"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="hidden sm:inline">Support</span>
        {unread > 0 && (
          <span className="ml-1 text-xs bg-black/80 rounded-full px-2 py-0.5">
            {unread}
          </span>
        )}
      </button>

      {/* Panneau du chat */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[90vw] max-w-sm rounded-2xl overflow-hidden shadow-2xl bg-[#141414] border border-gray-800">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/60">
            <div className="font-semibold">Support</div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-white/10 rounded"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Liste des messages */}
          <div ref={listRef} className="max-h-80 overflow-y-auto px-3 py-4 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-2xl max-w-[75%] text-sm ${
                    m.from === "me"
                      ? "bg-orange-500 text-white rounded-br-sm"
                      : "bg-gray-800 text-white rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {!wsReady && (
              <p className="text-xs text-gray-400">Connexion au support…</p>
            )}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t border-gray-800">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMsg()}
              placeholder="Écrire un message…"
              className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-white placeholder-gray-500"
            />
            <button
              onClick={sendMsg}
              disabled={disabled}
              className={`p-2 rounded-xl ${
                disabled ? "bg-gray-700 text-gray-400" : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
              aria-label="Envoyer"
              title={wsReady ? "Envoyer" : "Connexion en cours…"}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
