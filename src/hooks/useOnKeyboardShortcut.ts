import { useEffect } from 'react';

type KeyboardShortcut = {
  key: string;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
}

function matchKeyboardEvent(keyboardShortcut: KeyboardShortcut, event: KeyboardEvent): boolean {
  return keyboardShortcut.key === event.key &&
    !!keyboardShortcut.altKey === event.altKey &&
    !!keyboardShortcut.ctrlKey === event.ctrlKey &&
    !!keyboardShortcut.metaKey === event.metaKey &&
    !!keyboardShortcut.shiftKey === event.shiftKey;
}

export default function useOnKeyboardShortcut(keyboardShortcut: KeyboardShortcut, cb: (e: KeyboardEvent) => void) {
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.repeat) {
        return;
      }

      if (!matchKeyboardEvent(keyboardShortcut, e)) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      cb(e);
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [keyboardShortcut, cb]);
}
