'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type ReactionContextData = {
  reactions: Reaction[];
  selectedReaction: Reaction | null;
  setSelectedReaction: (reaction: Reaction | null) => void;
  updateReactionByUuid: (reaction: Reaction) => void;
};

export const ReactionContext = createContext({} as ReactionContextData);

interface ReactionProviderProps {
  children: ReactNode;
}

export type Reaction = {
  uuid: string;
  x: number;
  y: number;
  comment?: string;
  emoji?: string;
};

export function ReactionProvider({ children }: ReactionProviderProps) {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [selectedReaction, setSelectedReaction] = useState<Reaction | null>(
    null
  );

  const updateReactionByUuid = (newReaction: Reaction) => {
    setReactions((oldReactions) =>
      oldReactions.map((reaction) => {
        if (reaction.uuid === newReaction.uuid) {
          return newReaction;
        }

        return reaction;
      })
    );
  };

  useEffect(() => {
    const handleMouseClick = (event: MouseEvent) => {
      if (selectedReaction !== null) {
        return;
      }

      const newReaction = {
        x: event.clientX,
        y: event.clientY,
        uuid: Math.random().toString(36),
      };

      setReactions((oldReactions) => {
        const hasReactionInRadius = oldReactions.some((reaction) => {
          const distance = Math.sqrt(
            Math.pow(reaction.x - newReaction.x, 2) +
              Math.pow(reaction.y - newReaction.y, 2)
          );

          return distance < 40;
        });

        if (hasReactionInRadius) {
          return oldReactions;
        }

        return [...oldReactions, newReaction];
      });
    };

    window.addEventListener('click', handleMouseClick);

    return () => {
      window.removeEventListener('click', handleMouseClick);
    };
  }, [selectedReaction]);

  return (
    <ReactionContext.Provider
      value={{
        reactions,
        selectedReaction,
        setSelectedReaction,
        updateReactionByUuid,
      }}
    >
      {children}
    </ReactionContext.Provider>
  );
}

export function useReactions() {
  return useContext(ReactionContext);
}
