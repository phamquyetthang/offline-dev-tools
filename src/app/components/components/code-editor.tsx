import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/ext-language_tools";
import { memo } from "react";

interface ICodeEditorProps {
  value: string;
  onChange?: (value: string, event?: any) => void;
}
const CodeEditor = ({ onChange, value }: ICodeEditorProps) => {
  return (
    <AceEditor
      mode="json5"
      theme="one_dark"
      value={value}
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      className="w-full h-full rounded-lg"
      width="100%"
      fontSize={16}
      lineHeight={19}
      showPrintMargin={false}
      editorProps={{ $blockScrolling: true }}
      onLoad={editorInstance => {
        editorInstance.container.style.resize = "both";
        // mouseup = css resize end
        document.addEventListener("mouseup", e => (
          editorInstance.resize()
        ));
      }}
    />
  );
};

export default memo(CodeEditor);
