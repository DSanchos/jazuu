"use client";

import { PortalLayout } from "@/src/layouts/PortalLayout";
import { Modal } from "@/src/ui/Modal";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  onInsert: (url: string, width?: number, height?: number) => void;
}

export function ModalImageUrl({ isOpen, setOpen, onInsert }: Props) {
  const [url, setUrl] = useState("");
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <div className="py-9 px-10 rounded-3xl bg-zinc-800 flex flex-col gap-5">
        <h2 className="text-xl font-bold">Вставка изображения</h2>

        <input
          type="text"
          placeholder="URL изображения"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border-b border-emerald-400 translate-border duration-300 p-1 focus:border-red-700 outline-none"
        />

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Ширина (px)"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="border-b border-emerald-400 translate-border duration-300 p-1 focus:border-red-700 outline-none w-32"
          />
          <input
            type="number"
            placeholder="Высота (px)"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="border-b border-emerald-400 translate-border duration-300 p-1 focus:border-red-700 outline-none w-32"
          />
        </div>

        <button
          className="px-4 py-2 bg-emerald-700 text-white rounded cursor-pointer transition-colors duration-300 hover:bg-emerald-800"
          onClick={() => {
            if (!url) return;
            onInsert(url, width || undefined, height || undefined);
            setUrl("");
            setWidth("");
            setHeight("");
            setOpen(false);
          }}
        >
          Вставить
        </button>
      </div>
    </Modal>
  );
}
