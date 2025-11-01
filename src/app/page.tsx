import { TextToolz } from "../components/TextToolz";
import { RichTextEditor } from "../ui/RichTextEditor";

export default function Home() {
  return (
    <div className="p-10 flex flex-col gap-10 min-h-screen">
      <TextToolz />

      <div className="max-w-4xl ml-auto mr-auto w-full">
        <RichTextEditor />
      </div>
    </div>
  );
}
