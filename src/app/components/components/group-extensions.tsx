import { IExtension } from "@app/models/types";
import CardExtension from "./card-extension";

interface IProps {
  title: string;
  extensions: IExtension[];
  pined?: boolean;
}
const GroupExtensions = ({ title, extensions, pined }: IProps) => {
  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <div className="flex flex-wrap gap-4">
        {extensions.map((e) => (
          <CardExtension
            {...e}
            key={e.key}
            extensionKey={e.key}
            pined={pined}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupExtensions;
