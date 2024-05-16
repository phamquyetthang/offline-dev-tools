import Generator from "@app/components/layouts/generator";
import { EXTENSION_KEY } from "@app/models/types";
import { faker } from "@faker-js/faker";
import { useCallback, useState } from "react";
const options = Object.keys(faker.lorem).filter((key) => key !== "faker").reverse();
const LoremTextGenerator = () => {
  const [optionValue, setOptionValue] = useState(options[0]);

  const generateFunc = useCallback(
    () => (faker.lorem as any)[optionValue](),
    [optionValue]
  );

  return (
    <Generator
      extensionKey={EXTENSION_KEY.lorem_text}
      generateFunc={generateFunc}
      options={options}
      optionValue={optionValue}
      onChooseOption={(value) => setOptionValue(value)}
    />
  );
};

export default LoremTextGenerator;
