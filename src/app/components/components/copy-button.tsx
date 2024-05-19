import { Button } from "@lib/components/ui/button";
import { Data } from "electron";
import truncate from "lodash-es/truncate";
import { Copy } from "lucide-react";
import { toast } from "sonner";
interface IProps {
  value: Data & { img?: string };
  disabled?: boolean;
  title?: string;
}
const CopyButton = ({ value, disabled, title }: IProps) => {
  return (
    <Button
      onClick={() => {
        window.electron.ipcRenderer.send("clipboard", value);
        toast(
          `Copied to clipboard <"${truncate(value.text, { length: 50 })}">`
        );
      }}
      disabled={disabled}
    >
      {title || "Copy"} <Copy className="w-5 h-5 ml-2" />
    </Button>
  );
};

export default CopyButton;

export const CopyIconButton = ({ value, disabled }: IProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        window.electron.ipcRenderer.send("clipboard", value);
        toast(
          `Copied to clipboard <"${truncate(value.text, { length: 50 })}">`
        );
      }}
      disabled={disabled}
    >
      <Copy className="w-5 h-5" />
    </Button>
  );
};
