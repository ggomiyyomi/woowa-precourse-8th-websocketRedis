// src/components/chat/MessageList.jsx

import { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import DateDivider from "../DateDivider";
import { formatToDate } from "../../utils/formatDateOnly";
export default function MessageList({ chatMessages, userId, ownerUserId }) {
  const listRef = useRef(null);

  const isUserScrollingRef = useRef(false);

  const prevLengthRef = useRef(chatMessages.length);

  const [previewMessage, setPreviewMessage] = useState(null);

  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;

    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;

    if (isBottom) {
      isUserScrollingRef.current = false;

      requestAnimationFrame(() => setPreviewMessage(null));
    } else {
      isUserScrollingRef.current = true;
    }
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const prevLen = prevLengthRef.current;
    const currLen = chatMessages.length;

    if (currLen === 0) {
      prevLengthRef.current = 0;
      requestAnimationFrame(() => setPreviewMessage(null));
      return;
    }

    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;

    if (currLen > prevLen) {
      const lastMsg = chatMessages[currLen - 1];

      if (!isUserScrollingRef.current || isBottom) {
        requestAnimationFrame(() => {
          el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        });

        requestAnimationFrame(() => setPreviewMessage(null));
      } else {
        const sender =
          lastMsg.userId === ownerUserId ? "방장" : `사용자 ${lastMsg.userId}`;

        requestAnimationFrame(() =>
          setPreviewMessage(`${sender} : ${lastMsg.content}`)
        );
      }
    }

    prevLengthRef.current = currLen;
  }, [chatMessages, ownerUserId]);

  const scrollToBottom = () => {
    const el = listRef.current;
    if (!el) return;

    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });

    isUserScrollingRef.current = false;

    requestAnimationFrame(() => setPreviewMessage(null));
  };

  return (
    <div className="relative h-full">
      <div
        ref={listRef}
        onScroll={handleScroll}
        className="h-full border rounded-lg p-3 overflow-y-auto bg-gray-50"
      >
        {chatMessages.length === 0 ? (
          <p className="text-gray-500">아직 메시지가 없습니다.</p>
        ) : (
          chatMessages.map((msg, idx) => {
            const currDate = formatToDate(msg.createdAt);

            const prevDate =
              idx > 0 ? formatToDate(chatMessages[idx - 1].createdAt) : null;

            const showDivider = currDate !== prevDate;

            return (
              <div key={msg.id}>
                {showDivider && <DateDivider date={currDate} />}

                <MessageItem
                  msg={msg}
                  userId={userId}
                  ownerUserId={ownerUserId}
                />
              </div>
            );
          })
        )}
      </div>

      {/* 🔥 새 메시지 미리보기 (카톡 스타일) */}
      {previewMessage && (
        <button
          onClick={scrollToBottom}
          className="
            absolute bottom-20 left-1/2 transform -translate-x-1/2
            bg-blue-600 text-white px-4 py-2 rounded-full shadow-xl
            hover:bg-blue-700 transition cursor-pointer
            max-w-[80%] whitespace-nowrap overflow-hidden text-ellipsis
          "
        >
          💬 {previewMessage}
        </button>
      )}
    </div>
  );
}
