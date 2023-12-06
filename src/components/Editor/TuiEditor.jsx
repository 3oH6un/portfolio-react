import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { postFile } from "@/lib/api";

export function TuiEditor({ content, editorRef, addImage }) {
  const uploadFile = async (file, callback) => {
    try {
      const path = await postFile(file);
      const imageUrl = `http://127.0.0.1:8001/api/file/${path}`;
      addImage(path);
      callback(imageUrl, file.name);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
    return false;
  };

  return (
    <div className="m-4 w-[58rem]">
      {editorRef && (
        <Editor
          initialValue={content ?? " "}
          ref={editorRef}
          previewStyle="tab"
          initialEditType="markdown"
          autofocus={false}
          hideModeSwitch={true}
          height="600px"
          theme="dark"
          hooks={{
            addImageBlobHook: uploadFile,
          }}
        />
      )}
    </div>
  );
}
