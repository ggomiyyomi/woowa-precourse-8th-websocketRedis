// src/components/chat/MessageList.jsx

import { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import DateDivider from "../DateDivider";
import { formatToDate } from "../../utils/formatDateOnly";
export default function MessageList({ chatMessages, userId, ownerUserId }) {
  const listRef = useRef(null);

  // 유저가 스크롤 올렸는지 체크
  const isUserScrollingRef = useRef(false);

  // 이전 메시지 길이 저장 → 새 메시지 감지
  const prevLengthRef = useRef(chatMessages.length);

  // 미리보기 UI 상태
  const [previewMessage, setPreviewMessage] = useState(null);

  // 스크롤 이벤트: 사용자가 맨 아래에 있는지 판단
  const handleScroll = () => {
    const el = listRef.current;
    if (!el) return;

    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;

    if (isBottom) {
      isUserScrollingRef.current = false;

      // 미리보기 제거는 React 경고 방지를 위해 frame 뒤에 수행
      requestAnimationFrame(() => setPreviewMessage(null));
    } else {
      isUserScrollingRef.current = true;
    }
  };

  // 새 메시지 왔을 때 처리
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const prevLen = prevLengthRef.current;
    const currLen = chatMessages.length;

    // 첫 렌더링 시
    if (currLen === 0) {
      prevLengthRef.current = 0;
      requestAnimationFrame(() => setPreviewMessage(null));
      return;
    }

    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;

    // 새 메시지 들어옴
    if (currLen > prevLen) {
      const lastMsg = chatMessages[currLen - 1];

      // 내가 맨 아래에 있으면 자동 스크롤 + 미리보기 없음
      if (!isUserScrollingRef.current || isBottom) {
        requestAnimationFrame(() => {
          el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        });

        requestAnimationFrame(() => setPreviewMessage(null));
      } else {
        // 위로 스크롤 중이면 미리보기 보여주기
        const sender =
          lastMsg.userId === ownerUserId ? "방장" : `사용자 ${lastMsg.userId}`;

        requestAnimationFrame(() =>
          setPreviewMessage(`${sender} : ${lastMsg.content}`)
        );
      }
    }

    prevLengthRef.current = currLen;
  }, [chatMessages, ownerUserId]);

  // 버튼 클릭 → 강제로 스크롤 맨 아래로
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
              <div key={msg.cmId}>
                {showDivider && <DateDivider date={currDate} />}

                <MessageItem
                  key={msg.cmId}
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
