"use client";

import { useEffect, useRef } from "react";
import { mobxFormatText } from "../stores/formatText";

export function RichTextEditor() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mobxFormatText.setEditor(editorRef.current);
  }, []);

  return (
    <div
      ref={editorRef}
      contentEditable
      onMouseUp={() => {
        mobxFormatText.saveSelection();
      }}
      className="w-full min-h-screen bg-emerald-100/20 border-2 border-emerald-100/40 rounded-2xl outline-none p-4 resize-none"
    ></div>
  );
}
