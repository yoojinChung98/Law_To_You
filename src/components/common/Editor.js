import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";

import "react-quill/dist/quill.bubble.css";
import commUtil from "../../util/commUtil";
import "./quill.snow.css";

// Quill.register("modules/blotFormatter", BlotFormatter);
// Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

const Editor = (props) => {
  const { readOnly = false, data, height = "300px" } = props;
  const refEditor = useRef(null);
  const [isView, setIsView] = useState(false);

  const fileMaxSize = 10;

  //   const Font = Quill.import("formats/font");
  const Size = Quill.import("formats/size");

  //   Font.whitelist = [
  //     "dotum",
  //     "gullim",
  //     "batang",
  //     "NanumGothic",
  //     "Sandoll Samliphopangche",
  //   ];
  Size.whitelist = ["8", "9", "10", "11", "12", "14", "18", "24", "36"];
  Quill.register(Size, true);
  //   Quill.register(Font, true);

  const modules = {
    toolbar: {
      container: [
        // [{ font: Font.whitelist }],
        [{ size: Size.whitelist }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { align: [] }],
        ["bold", "italic", "underline", "strike"],
        // ["blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        // ["link", "image", "video"],
        [{ align: [] }, { color: [] }, { background: [] }],
        ["clean"],
      ],
    },
  };

  const formats = [
    // "font",
    "size",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    // "blockquote",
    "list",
    "bullet",
    "indent",
    // "link",
    // "image",
    // "video",
    "align",
    "color",
    "background",
  ];

  function imageDropHandler(imageDataUrl, type, file) {
    const quillObj = refEditor.current.getEditor();

    const range = quillObj.getSelection();
    quillObj.editor.insertEmbed(range.index, "image", imageDataUrl);

    props.onChange(quillObj.root.innerHTML);
  }

  const editorOnChange = (editor, source, content) => {
    props.onChange(content);
    console.log(content);
  };

  useEffect(() => {
    setIsView(true);
  }, []);

  useEffect(() => {
    if (commUtil.isNotEmpty(data)) {
      props.onChange(data);
    }
  }, [data]);

  let isUpdated = false;

  useEffect(() => {
    if (refEditor.current && !isUpdated && props.editor) {
      props.editor(refEditor.current.getEditor());
      isUpdated = true;
    }
  }, [refEditor.current]);

  return (
    <>
      {isView && (
        <ReactQuill
          ref={refEditor}
          style={{ height: "220px" }}
          theme={!readOnly ? "snow" : "bubble"}
          modules={modules}
          type={"html"}
          formats={formats}
          value={data}
          onChange={(content, delta, source, editor) => {
            editorOnChange(editor, source, content);
          }}
          onBlur={(range, source, quill) => {
            props.onChange(quill.getHTML());
          }}
          readOnly={readOnly}
        />
      )}
    </>
  );
};

export default Editor;
