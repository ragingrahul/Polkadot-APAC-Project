import React, { useEffect } from "react";
import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Image,
  Italic,
  List,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { useDispatch, useSelector } from "react-redux";
import { setEditor, setTitle, setCover } from "@/redux/defaultSlice";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const PostPlayground = () => {
  const title = useSelector((state) => state.default.title);
  const cover = useSelector((state) => state.default.cover);
  const dispatch = useDispatch();
  const imgRef = React.useRef(null);
  const router = useRouter();
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "w-full prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none text-white mt-5",
      },
    },
    content: `<p>Start writing about anything...</p>`,
    injectCSS: true,
  });

  useEffect(() => {
    if (!editor) return;
    dispatch(setEditor(editor));
  }, [editor]);

  return (
    <div
      className="ml-[575px] p-20 pr-20 relative"
      style={{
        width: "calc(100% - 575px)",
      }}
    >
      {/* Cover Image Selector */}
      <div
        onClick={() => {
          imgRef?.current?.click();
        }}
        className="hover:cursor-pointer flex justify-center items-center"
        style={{
          width: cover ? "100%" : "fit-content",
          height: cover ? "400px" : "fit-content",
          marginTop: cover ? "20px" : "0px",
        }}
      >
        {cover ? (
          <img
            onClick={() => {
              imgRef?.current?.click();
            }}
            src={URL.createObjectURL(cover)}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-row text-muted-foreground text-sm items-center">
            <Image className="w-4 h-4 mr-1" />
            <p className="">Add Cover</p>
          </div>
        )}
      </div>
      <input
        type="file"
        className="hidden"
        ref={imgRef}
        onChange={(e) => {
          if (!e.target.files) return;
          dispatch(setCover(e.target.files[0]));
          console.log(e.target.files[0].type);
        }}
      />

      {/* Title */}
      <input
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
        placeholder="Title..."
        className=" focus:outline-none w-full text-white text-5xl mt-5 font-bold bg-transparent"
      />

      {/* Main Editor */}
      <EditorContent editor={editor} />

      {/* Editor Options */}
      <div className="flex flex-row mt-5 space-x-3">
        <Button
          className="bg-white text-black hover:bg-white hover:text-black p-3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading1 className="w-5 h-5" />
        </Button>
        <Button
          className="bg-white text-black hover:bg-white hover:text-black p-3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading2 className="w-5 h-5" />
        </Button>
        <Toggle
          className="bg-white text-muted-foreground"
          value={editor?.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-5 h-5" />
        </Toggle>
        <Toggle
          className="bg-white text-muted-foreground"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-5 h-5" />
        </Toggle>
        <Toggle
          className="bg-white text-muted-foreground"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="w-5 h-5" />
        </Toggle>
        <Toggle
          className="bg-white text-muted-foreground"
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className="w-5 h-5" />
        </Toggle>
        <Button
          className="bg-white text-black hover:bg-white hover:text-black p-3"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-5 h-5" />
        </Button>
        <Button
          className="bg-white text-black hover:bg-white hover:text-black p-3"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo className="w-5 h-5" />
        </Button>
        <Button
          className="bg-white text-black hover:bg-white hover:text-black p-3"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo className="w-5 h-5" />
        </Button>
      </div>
      <div className="absolute top-10 right-10">
        <Button
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "bg-transparent text-muted-foreground hover:bg-transparent focus:outline-none hover:ring-0 hover:text-white w-fit relative"
          )}
          onClick={() => {
            router.push("/feed");
          }}
        >
          Back to feed
        </Button>
      </div>
    </div>
  );
};

export default PostPlayground;
