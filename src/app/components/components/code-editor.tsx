import AceEditor from "react-ace";
import { useTheme } from "../layouts/theme";

import "ace-builds/src-noconflict/mode-json5";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-tsx";
import "ace-builds/src-noconflict/mode-scss";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";
import { memo } from "react";

export type ICodeEditorLang = "json5" | "html" | "tsx" | "scss" | "css";
interface ICodeEditorProps {
  lang: ICodeEditorLang;
  value: string;
  onChange?: (value: string, event?: any) => void;
  readOnly?: boolean;
  height?: string;
}
const CodeEditor = ({
  onChange,
  value,
  lang,
  readOnly,
  height,
}: ICodeEditorProps) => {
  const { theme } = useTheme();

  return (
    <AceEditor
      mode={lang}
      theme={theme === "light" ? "tomorrow" : "one_dark"}
      value={value}
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      className="w-full h-full rounded-lg"
      width="100%"
      fontSize={16}
      lineHeight={19}
      showPrintMargin={false}
      editorProps={{ $blockScrolling: true }}
      readOnly={readOnly}
      height={height}
      onLoad={(editorInstance) => {
        editorInstance.container.style.resize = "both";
        // mouseup = css resize end
        document.addEventListener("mouseup", (e) => editorInstance.resize());
      }}
    />
  );
};

export default memo(CodeEditor);
