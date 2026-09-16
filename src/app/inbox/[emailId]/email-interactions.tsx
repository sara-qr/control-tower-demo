"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";

type EmailStatus = "Unanswered" | "Pending" | "Answered" | "Resolved";

type EmailInteractionContextValue = {
  status: EmailStatus;
  setStatus: Dispatch<SetStateAction<EmailStatus>>;
};

const EmailInteractionContext = createContext<EmailInteractionContextValue | null>(null);

function useEmailInteraction() {
  const context = useContext(EmailInteractionContext);
  if (!context) {
    throw new Error("Email interactions require EmailInteractionProvider");
  }
  return context;
}

export function EmailInteractionProvider({
  initialStatus,
  children,
}: {
  initialStatus: string;
  children: ReactNode;
}) {
  const [status, setStatus] = useState<EmailStatus>(() => {
    if (
      initialStatus === "Unanswered" ||
      initialStatus === "Pending" ||
      initialStatus === "Answered" ||
      initialStatus === "Resolved"
    ) {
      return initialStatus;
    }
    return "Pending";
  });

  return (
    <EmailInteractionContext.Provider value={{ status, setStatus }}>
      {children}
    </EmailInteractionContext.Provider>
  );
}

export function EmailStatusBadge() {
  const { status } = useEmailInteraction();
  const color = {
    Unanswered: "bg-[#f3cfe0]",
    Pending: "bg-[#f3e5bd]",
    Answered: "bg-[#d8f2a6]",
    Resolved: "bg-[#e8e8e2]",
  }[status];

  return <span className={`rounded-full px-4 py-2 text-sm ${color}`}>{status}</span>;
}

export function EmailActions() {
  const { setStatus } = useEmailInteraction();
  const [isComposing, setIsComposing] = useState(false);
  const [reply, setReply] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const sendTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (sendTimer.current) clearTimeout(sendTimer.current);
    };
  }, []);

  function sendReply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reply.trim() || isSending) return;

    setIsSending(true);
    setConfirmation("");
    sendTimer.current = setTimeout(() => {
      setIsSending(false);
      setIsComposing(false);
      setReply("");
      setStatus((current) => current === "Resolved" ? current : "Answered");
      setConfirmation("Reply sent");
      sendTimer.current = null;
    }, 600);
  }

  function resolveEmail() {
    setStatus("Resolved");
    setConfirmation("Email resolved");
  }

  return (
    <div className="border-t border-[#e8e8e2] pt-6">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            setIsComposing(true);
            setConfirmation("");
          }}
          className="rounded-full bg-[#171717] px-5 py-3 text-sm text-white"
        >
          Reply
        </button>

        <button
          type="button"
          onClick={resolveEmail}
          className="rounded-full border border-[#deded7] px-5 py-3 text-sm"
        >
          Mark as resolved
        </button>
      </div>

      {isComposing && (
        <form onSubmit={sendReply} className="mt-6">
          <label htmlFor="email-reply" className="mb-3 block text-sm font-medium">
            Your reply
          </label>
          <textarea
            id="email-reply"
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            disabled={isSending}
            rows={5}
            className="w-full resize-y rounded-[22px] border border-[#deded7] bg-white p-5 text-sm outline-none focus:border-[#171717]"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                setIsComposing(false);
                setReply("");
              }}
              disabled={isSending}
              className="rounded-full border border-[#deded7] px-5 py-3 text-sm disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!reply.trim() || isSending}
              className="rounded-full bg-[#171717] px-5 py-3 text-sm text-white disabled:opacity-50"
            >
              {isSending ? "Sending..." : "Send reply"}
            </button>
          </div>
        </form>
      )}

      {confirmation && (
        <p role="status" className="mt-4 text-sm text-[#777770]">
          {confirmation}
        </p>
      )}
    </div>
  );
}
