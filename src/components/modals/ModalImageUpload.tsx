import { mobxFormatText } from "@/src/stores/formatText";
import { Button } from "@/src/ui/Button";
import { Modal } from "@/src/ui/Modal";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  onUpload: (file: File, width?: number, height?: number) => void;
}

export function ModalImageUpload({ isOpen, setOpen, onUpload }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [width, setWidth] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleUpload = () => {
    if (!file) return;
    onUpload(
      file,
      width !== "" ? width : undefined,
      height !== "" ? height : undefined
    );
    setOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <div className="py-9 px-10 rounded-3xl bg-zinc-800 flex flex-col gap-5">
        {preview ? (
          <img src={preview} alt="preview" className="max-h-64 rounded-md" />
        ) : (
          <p className="text-gray-500">Выберите изображение для загрузки</p>
        )}

        {preview && (
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Ширина (px)"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="border-b border-emerald-400 translate-border duration-300 p-1 focus:border-red-700 outline-none w-full"
            />
            <input
              type="number"
              placeholder="Высота (px)"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="border-b border-emerald-400 translate-border duration-300 p-1 focus:border-red-700 outline-none w-full"
            />
          </div>
        )}

        <label className="w-full py-2.5 px-3.5 bg-zinc-600 cursor-pointer text-center text-white rounded-md hover:bg-emerald-600 transition-colors duration-300">
          Выбрать изображение
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <div className="flex gap-2">
          <Button
            onClick={() => setOpen(false)}
            className="w-full px-4 py-2 border rounded-md text-sm"
          >
            Отмена
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file}
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-md text-sm disabled:opacity-50"
          >
            Загрузить
          </Button>
        </div>
      </div>
    </Modal>
  );
}
