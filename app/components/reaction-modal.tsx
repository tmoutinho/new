'use client';

import { useReactions } from '@/lib/reactions-context';
import { useState } from 'react';

const emojies = [
  {
    name: 'smile',
    svg: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
        />
      </svg>
    ),
  },
  {
    name: 'sad',
    svg: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-3 h-3"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
        />
      </svg>
    ),
  },
];

export const ReactionModal = () => {
  const { selectedReaction, setSelectedReaction, updateReactionByUuid } =
    useReactions();
  const [newReaction, setNewReaction] = useState({
    emoji: selectedReaction?.emoji ?? 'smile',
    comment: selectedReaction?.comment ?? '',
  });

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: selectedReaction?.x !== undefined ? selectedReaction?.x + 20 : 0,
        top: selectedReaction?.y,
      }}
      onClick={() => setSelectedReaction(null)}
    >
      <div
        className="bg-white shadow-md rounded-md pointer-events-auto space-y-2 min-w-[200px]"
        onClick={(event) => event.stopPropagation()}
      >
        <input
          value={newReaction?.comment || ''}
          className="flex h-10 w-full border-b border-gray-100 rounded-md bg-transparent bg-white px-3 py-2 text-xs placeholder:text-slate-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(event) =>
            setNewReaction({
              ...newReaction,
              comment: event.target.value,
            })
          }
        />
        <div className="flex justify-between items-center px-2 pb-2">
          <div className="flex items-center gap-1">
            {emojies.map((emoji) => (
              <button
                key={emoji.name}
                className={`p-1 rounded-full border  hover:border-blue-300 transition-all ${newReaction?.emoji === emoji.name ? 'border-blue-500' : 'border-gray-100'}`}
                onClick={() =>
                  setNewReaction({
                    ...newReaction,
                    emoji: emoji.name,
                  })
                }
              >
                {emoji.svg()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="hover:opacity-65 transition-all"
              onClick={() => {
                setSelectedReaction(null);

                setNewReaction({
                  emoji: 'smile',
                  comment: '',
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>

            <button
              className="hover:opacity-65 transition-all"
              onClick={() => {
                if (selectedReaction === null) {
                  return;
                }

                updateReactionByUuid({
                  ...selectedReaction,
                  ...newReaction,
                });

                setSelectedReaction(null);
                setNewReaction({
                  emoji: 'smile',
                  comment: '',
                });
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
