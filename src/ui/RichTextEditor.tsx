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
      onMouseUp={() => mobxFormatText.saveSelection()}
      onKeyUp={() => mobxFormatText.saveSelection()}
      className="w-full min-h-20 bg-emerald-100/20 rounded-2xl outline-none focus:border-emerald-300 p-4 resize-none"
    ></div>
  );
}
