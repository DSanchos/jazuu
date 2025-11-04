"use client";

import {
  RotateCcw,
  TextAlignStart,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  Save,
} from "lucide-react";
import { Bold, Italic, Underline, Strikethrough } from "lucide-react";
import {
  Heading,
  ListOrdered,
  ListCollapse,
  DiamondMinus,
  Link,
  Image,
} from "lucide-react";
import { Button } from "../ui/Button";
import { DropdownMenu } from "../ui/DropdownMenu";
import { mobxFormatText } from "../stores/formatText";
import { useState } from "react";
import { ModalImageUrl } from "./modals/ModalImageUrl";
import { ModalImageUpload } from "./modals/ModalImageUpload";

export function TextToolz() {
  const [isOpenUrlImage, setIsOpenUrlImage] = useState<boolean>(false);
  const [isOpenUploadImage, setIsOpenUploadImage] = useState<boolean>(false);

  return (
    <div className="max-w-4xl ml-auto mr-auto w-full flex items-center gap-6 bg-emerald-400/50 p-4 rounded-4xl sticky top-3">
      <div className="flex gap-2.5">
        <Button onClick={() => mobxFormatText.resetFormat()}>
          <RotateCcw size={24} />
        </Button>
        <Button onClick={() => mobxFormatText.downloadFile()}>
          <Save size={24} />
        </Button>
      </div>

      <div className="flex gap-2.5">
        <Button onClick={() => mobxFormatText.setTextAlign("left")}>
          <TextAlignStart size={24} />
        </Button>
        <Button onClick={() => mobxFormatText.setTextAlign("center")}>
          <TextAlignCenter size={24} />
        </Button>
        <Button onClick={() => mobxFormatText.setTextAlign("right")}>
          <TextAlignEnd size={24} />
        </Button>
        <Button onClick={() => mobxFormatText.setTextAlign("justify")}>
          <TextAlignJustify size={24} />
        </Button>
      </div>

      <div className="flex gap-2.5">
        <Button onClick={() => mobxFormatText.setTextFormat("bold")}>
          <Bold size={24} />
        </Button>
        <Button onClick={() => mobxFormatText.setTextFormat("italic")}>
          <Italic size={24} />
        </Button>
        <Button onClick={() => mobxFormatText.setTextFormat("underline")}>
          <Underline size={24} />
        </Button>
        <Button onClick={() => mobxFormatText.setTextFormat("strikeThrough")}>
          <Strikethrough size={24} />
        </Button>
      </div>

      <div className="flex gap-2.5">
        <DropdownMenu
          label={<Heading size={24} />}
          items={[
            { text: "H1", onClick: () => mobxFormatText.insertHeading("H1") },
            { text: "H2", onClick: () => mobxFormatText.insertHeading("H2") },
            { text: "H3", onClick: () => mobxFormatText.insertHeading("H3") },
            { text: "H4", onClick: () => mobxFormatText.insertHeading("H4") },
            { text: "H5", onClick: () => mobxFormatText.insertHeading("H5") },
            { text: "H6", onClick: () => mobxFormatText.insertHeading("H6") },
            {
              text: "Default",
              onClick: () => mobxFormatText.insertHeading("default"),
            },
          ]}
        />
        <Button onClick={() => mobxFormatText.insertHR()}>
          <DiamondMinus size={24} />
        </Button>
        <Button onClick={() => mobxFormatText.insertOrderedList()}>
          <ListOrdered size={24} />
        </Button>
        <Button onClick={() => mobxFormatText.insertUnorderedList()}>
          <ListCollapse size={24} />
        </Button>
      </div>

      <div className="flex gap-2.5">
        <Button onClick={() => setIsOpenUrlImage(true)}>
          <Link size={24} />
        </Button>
        <Button onClick={() => setIsOpenUploadImage(true)}>
          <Image size={24} />
        </Button>
      </div>

      <div className="absolute top-3 right-5 flex gap-2.5 ml-auto font-bold text-4xl">
        <h1 className="text-zinc-500 animate-bounce">J</h1>
        <h1 className="text-zinc-600 animate-none">A</h1>
        <h1 className="text-zinc-700 animate-ping">Z</h1>
        <h1 className="text-zinc-800 animate-pulse">U</h1>
        <h1 className="text-zinc-900 animate-spin">U</h1>
      </div>

      <ModalImageUrl
        isOpen={isOpenUrlImage}
        setOpen={setIsOpenUrlImage}
        onInsert={mobxFormatText.insertImage}
      />

      <ModalImageUpload
        isOpen={isOpenUploadImage}
        setOpen={setIsOpenUploadImage}
        onUpload={mobxFormatText.imageUpload}
      />
    </div>
  );
}
