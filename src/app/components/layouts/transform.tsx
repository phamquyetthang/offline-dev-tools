import { Button } from "@lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@lib/components/ui/card";
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  ArrowRightLeft,
  Columns2,
  Eraser,
  Rows2,
} from "lucide-react";
import "./transform.css";
import { memo, useState } from "react";
import clsx from "clsx";
import { useResizeDetector } from "react-resize-detector";
import CodeEditor, { ICodeEditorLang } from "../components/code-editor";
import { CopyIconButton } from "../components/copy-button";

interface EditorProps {
  value: string;
  lang?: ICodeEditorLang;
  elKey?: string;
  readOnly?: boolean;
  onChange: (v?: string) => void;
}

const EditorContent = memo(
  function InputEditorWrapper({
    value,
    lang = "html",
    onChange,
    elKey,
    readOnly,
  }: EditorProps) {
    const { height, ref } = useResizeDetector();

    return (
      <CardContent ref={ref} className="h-full flex-1 overflow-auto">
        <CodeEditor
          key={elKey}
          lang={lang}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          height={`${(height || 200) - 24}px`}
        />
      </CardContent>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.lang === nextProps.lang &&
      prevProps.elKey === nextProps.elKey &&
      prevProps.readOnly === nextProps.readOnly
    );
  }
);

interface IInputProps {
  input: string;
  inputLang?: ICodeEditorLang;
  inputDesc?: string;
  inputTitle?: string;
  onChangeInput: (input?: string) => void;
}

interface IOutputProps {
  output: string;
  outputLang?: ICodeEditorLang;
  outputDesc?: string;
  outputTitle?: string;
  onChangeOutput: (output?: string) => void;
}

interface IProps {
  title: string;
  onTransform: (isRevert?: boolean) => void;
  inputProps: IInputProps;
  outputProps: IOutputProps;
  canRevert?: boolean;
}

const TransformLayout = ({
  title,
  onTransform,
  inputProps,
  outputProps,
  canRevert,
}: IProps) => {
  const { inputDesc, inputTitle, onChangeInput, input, inputLang } = inputProps;
  const { outputDesc, outputTitle, onChangeOutput, output, outputLang } =
    outputProps;
  const [isColumn, setIsColumn] = useState(true);
  const [isRevert, setIsRevert] = useState(false);

  const { width, ref } = useResizeDetector();

  const inputKey = `${width}x${isColumn}`;
  const outputKey = `${width}x${isColumn}`;

  return (
    <div className="max-h-screen" ref={ref}>
      <div className="flex justify-between overflow-x-hidden mb-8">
        <div className="flex gap-4">
          <h3 className="font-semibold">{title}</h3>
          {canRevert && (
            <Button
              size="icon"
              className="p-1 w-6 h-6"
              onClick={() => setIsRevert((pre) => !pre)}
            >
              {isRevert ? <ArrowLeftRight /> : <ArrowRightLeft />}
            </Button>
          )}
        </div>

        <button onClick={() => setIsColumn((pre) => !pre)}>
          {isColumn ? <Columns2 /> : <Rows2 />}
        </button>
      </div>

      <div
        className={clsx(
          "gap-3 overflow-auto transform-content min-h-[80vh] flex",
          isColumn
            ? [isRevert ? "flex-row-reverse" : "flex-row"]
            : [isRevert ? "flex-col-reverse" : "flex-col"]
        )}
      >
        <Card className="flex-1 flex flex-col items-stretch">
          <CardHeader className="relative">
            <CardTitle>{inputTitle || "Input"}</CardTitle>
            {!!inputDesc && (
              <CardDescription className="break-all">
                {inputDesc}
              </CardDescription>
            )}
            <div className="absolute top-4 right-5 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                disabled={!input}
                onClick={() => onChangeInput("")}
              >
                <Eraser className="w-5 h-5" />
              </Button>
              <CopyIconButton value={{ text: input }} disabled={!input} />
            </div>
          </CardHeader>
          <EditorContent
            elKey={inputKey}
            onChange={(v) => {
              onChangeInput(v);
              if (!isRevert) {
                onTransform(isRevert);
              }
            }}
            value={input}
            lang={inputLang}
            readOnly={isRevert}
          />
        </Card>
        <div className="flex justify-around mx-auto">
          <Button
            variant="ghost"
            onClick={() => onTransform(isRevert)}
            size="icon"
          >
            {isColumn ? <ArrowRight /> : <ArrowDown />}
          </Button>
        </div>
        <Card className="flex-1 flex flex-col">
          <CardHeader className="relative">
            <CardTitle>{outputTitle || "Output"}</CardTitle>
            {!!outputDesc && (
              <CardDescription className="break-all">
                {outputDesc}
              </CardDescription>
            )}

            <div className="absolute top-4 right-5 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                disabled={!output}
                onClick={() => onChangeOutput("")}
              >
                <Eraser className="w-5 h-5" />
              </Button>
              <CopyIconButton value={{ text: output }} disabled={!output} />
            </div>
          </CardHeader>
          <EditorContent
            elKey={outputKey}
            onChange={(v) => {
              onChangeOutput(v);
              if (isRevert) {
                onTransform(isRevert);
              }
            }}
            value={output}
            lang={outputLang}
            readOnly={!isRevert}
          />
        </Card>
      </div>
    </div>
  );
};

export default TransformLayout;
