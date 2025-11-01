import { makeAutoObservable } from "mobx";

const heading = {
  H1: "text-5xl",
  H2: "text-4xl",
  H3: "text-3xl",
  H4: "text-2xl",
  H5: "text-xl",
  H6: "text-lg",
  default: "text-base",
};

class FormatTextStore {
  align = "left";
  editor: HTMLDivElement | null = null;
  savedRange: Range | null = null;

  saveSelection = () => {
    const sel = window.getSelection();
    if (
      sel &&
      sel.rangeCount > 0 &&
      this.editor?.contains(sel.getRangeAt(0).commonAncestorContainer)
    ) {
      this.savedRange = sel.getRangeAt(0).cloneRange();
    }
  };

  restoreSelection = () => {
    if (!this.savedRange) return;
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(this.savedRange);
  };

  constructor() {
    makeAutoObservable(this);
  }

  setEditor(editor: HTMLDivElement | null) {
    this.editor = editor;
  }

  resetFormat = () => {
    this.restoreSelection();

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !this.editor) return;

    const range = sel.getRangeAt(0);
    const parent = range.startContainer.parentElement;

    if (!parent || parent === this.editor) return;

    // Сброс классов Tailwind (например для heading)
    parent.className = "";
  };

  setTextAlign = (align: "left" | "center" | "right" | "justify") => {
    switch (align) {
      case "left":
        document.execCommand("justifyLeft");
        break;
      case "center":
        document.execCommand("justifyCenter");
        break;
      case "right":
        document.execCommand("justifyRight");
        break;
      case "justify":
        document.execCommand("justifyFull");
        break;
    }
    this.align = align;
  };

  setTextFormat = (
    format: "bold" | "italic" | "underline" | "strikeThrough"
  ) => {
    document.execCommand(format);
  };

  insertHeading = (
    sizeClass: "H1" | "H2" | "H3" | "H4" | "H5" | "H6" | "default"
  ) => {
    this.restoreSelection();
    this.editor?.focus();

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (!this.editor || !this.editor.contains(range.commonAncestorContainer)) {
      return;
    }

    const div = document.createElement("div");
    div.className = heading[sizeClass];

    if (range.collapsed) {
      div.innerHTML = "<br>";
      range.insertNode(div);
    } else {
      div.appendChild(range.extractContents());
      range.insertNode(div);
    }

    const newRange = document.createRange();
    newRange.selectNodeContents(div);
    newRange.collapse(false);
    sel.removeAllRanges();
    sel.addRange(newRange);
  };

  insertHR = () => {
    document.execCommand("insertHorizontalRule");
  };

  insertOrderedList = () => {
    this.restoreSelection();
    this.editor?.focus();

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    if (!this.editor || !this.editor.contains(range.commonAncestorContainer)) {
      return;
    }
    const ol = document.createElement("ol");
    ol.className = "list-decimal ml-6"; // Tailwind: нумерованный + отступ

    if (range.collapsed) {
      const li = document.createElement("li");
      li.innerHTML = "<br>";
      ol.appendChild(li);
      range.insertNode(ol);
    } else {
      const li = document.createElement("li");
      li.appendChild(range.extractContents());
      ol.appendChild(li);
      range.insertNode(ol);
    }

    const newRange = document.createRange();
    newRange.selectNodeContents(ol);
    newRange.collapse(false);
    sel.removeAllRanges();
    sel.addRange(newRange);
  };

  insertUnorderedList = () => {
    this.restoreSelection();
    this.editor?.focus();

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    if (!this.editor || !this.editor.contains(range.commonAncestorContainer)) {
      return;
    }
    const ul = document.createElement("ul");
    ul.className = "list-disc ml-6"; // Tailwind: маркеры + отступ

    if (range.collapsed) {
      const li = document.createElement("li");
      li.innerHTML = "<br>";
      ul.appendChild(li);
      range.insertNode(ul);
    } else {
      const li = document.createElement("li");
      li.appendChild(range.extractContents());
      ul.appendChild(li);
      range.insertNode(ul);
    }

    const newRange = document.createRange();
    newRange.selectNodeContents(ul);
    newRange.collapse(false);
    sel.removeAllRanges();
    sel.addRange(newRange);
  };

  insertImage = (url: string, width?: number, height?: number) => {
    this.restoreSelection();
    this.editor?.focus();

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !this.editor) return;

    const range = sel.getRangeAt(0);
    if (!this.editor || !this.editor.contains(range.commonAncestorContainer)) {
      return;
    }

    const img = document.createElement("img");
    img.src = url;
    img.alt = "image";
    if (width) img.width = width;
    if (height) img.height = height;
    img.className = "max-w-full rounded";

    range.insertNode(img);

    const newRange = document.createRange();
    newRange.setStartAfter(img);
    newRange.collapse(true);

    sel.removeAllRanges();
    sel.addRange(newRange);
  };

  handleFileUpload = (file: File) => {
    this.restoreSelection();
    this.editor?.focus();

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      mobxFormatText.insertImage(url);
    };
    reader.readAsDataURL(file);
  };
}

export const mobxFormatText = new FormatTextStore();
