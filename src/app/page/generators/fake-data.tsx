import CodeEditor from "@app/components/components/code-editor";
import CopyButton from "@app/components/components/copy-button";
import { faker } from "@faker-js/faker";
import { Button } from "@lib/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@lib/components/ui/card";
import Combobox from "@lib/components/ui/combobox";
import { Input } from "@lib/components/ui/input";
import { Label } from "@lib/components/ui/label";
import { Switch } from "@lib/components/ui/switch";
import ReactJson from "@microlink/react-json-view";
import { Plus, Trash } from "lucide-react";
import { ChangeEvent, useState } from "react";

const optionsGroup = [
  {
    group: "Person",
    options: Object.keys(faker.person)
      .filter((f) => f !== "faker")
      .map((key) => ({
        value: key,
        function: (faker.person as any)[key],
      })),
  },
  {
    group: "String",
    options: Object.keys(faker.string)
      .filter((f) => f !== "faker")
      .map((key) => ({
        value: key,
        function: (faker.string as any)[key],
      })),
  },
  {
    group: "Location",
    options: Object.keys(faker.location)
      .filter((f) => f !== "faker")
      .map((key) => ({
        value: key,
        function: (faker.location as any)[key],
      })),
  },
  {
    group: "Finance",
    options: Object.keys(faker.finance)
      .filter((f) => f !== "faker")
      .map((key) => ({
        value: key,
        function: (faker.finance as any)[key],
      })),
  },
];

const FakeData = () => {
  const [times, setTimes] = useState(1);
  const [schema, setSchema] = useState([
    {
      name: "id",
      option: { value: "uuid", function: faker.string.uuid },
    },
  ]);
  const [outputs, setOutputs] = useState<Array<Record<string, any>>>([]);

  const [viewRaw, setViewRaw] = useState(false);

  const onGenerate = () => {
    const res: Array<Record<string, any>> = [];
    for (let i = 0; i < times; i++) {
      const obj: Record<string, any> = {};
      schema
        .filter((i) => !!i.name)
        .forEach((s) => {
          obj[s.name] = s.option.function();
        });
      res.push(obj);
    }
    setOutputs(res);
  };

  const isDisabled = schema.every((s) => !s.name);

  const onChangeFieldName =
    (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
      setSchema((pre) =>
        pre.map((replaceArg, i) => {
          if (i === index) {
            return {
              ...replaceArg,
              name: e.target.value,
            };
          }
          return replaceArg;
        })
      );
    };
  const onChangeFieldOption = (index: number, option: any) => {
    setSchema((pre) =>
      pre.map((replaceArg, i) => {
        if (i === index) {
          return {
            ...replaceArg,
            option: option,
          };
        }
        return replaceArg;
      })
    );
  };
  const onRemoveSchema = (index: number) => {
    setSchema((pre) => pre.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h3 className="font-semibold  mb-4">Fake data tools</h3>
      <Card>
        <CardHeader>
          <CardTitle>Schema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-4 flex flex-col gap-1">
            {schema.map((s, index) => (
              <div className="flex gap-4 items-center" key={index}>
                <Input
                  placeholder="Field name"
                  className="w-[180px]"
                  value={s.name}
                  onChange={onChangeFieldName(index)}
                />
                <Combobox
                  optionsGroup={optionsGroup}
                  defaultValue={s.option.value}
                  onValueChange={(option) => {
                    onChangeFieldOption(index, option);
                  }}
                />

                {!!index && (
                  <button
                    className="p-2 bg-slate-200 rounded shadow"
                    onClick={() => onRemoveSchema(index)}
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <Button
              onClick={() =>
                setSchema((pre) =>
                  pre.concat({
                    name: optionsGroup[0].options[schema.length].value,
                    option: optionsGroup[0].options[schema.length],
                  })
                )
              }
              variant="outline"
              size="icon"
            >
              <Plus />
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 items-center">
            <Button disabled={isDisabled} onClick={onGenerate}>
              Generate
            </Button>
            <Input
              className="w-14"
              placeholder="Number of items"
              value={times}
              type="number"
              onChange={(e) => setTimes(Number(e.target.value))}
            />
            <span>items</span>
          </div>
        </CardFooter>
      </Card>
      <Card className="mt-8">
        <CardHeader className="flex gap-4 flex-row items-center">
          <CardTitle>Outputs</CardTitle>
          <CopyButton
            value={{ text: JSON.stringify(outputs, null, 2) }}
            disabled={!outputs.length}
          />
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center space-x-2 ">
              <Switch
                id="view-raw"
                onCheckedChange={setViewRaw}
                checked={viewRaw}
              />
              <Label htmlFor="view-raw">Raw</Label>
            </div>
            {viewRaw ? (
              <CodeEditor
                value={JSON.stringify(outputs, null, 2)}
                // onChange={onChange}
                // height={(height || 200) - 24}
              />
            ) : (
              <ReactJson src={outputs} displayDataTypes={false} />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FakeData;
