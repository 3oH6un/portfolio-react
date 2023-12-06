import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

// export function Viewer({ content, style }: Props) {
export function TuiViewer({ content, viewerRef }) {
  console.log("viewerRef", viewerRef);
  return (
    // <section className={style}>
    <section className="" id={"tui-viewer"}>
      {viewerRef && (
        <Viewer initialValue={content} theme="dark" ref={viewerRef} />
        // <Viewer initialValue={content} ref={viewerRef} />
      )}
    </section>
  );
}
