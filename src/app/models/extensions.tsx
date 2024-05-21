import { lazy } from "react";
import {
  CATEGORIES_KEY,
  EXTENSION_KEY,
  ICategory,
  IExtension,
} from "@app/models/types";
import { SiMongodb, SiSass } from "react-icons/si";

import All from "@app/page/all";
import EncoderDecoder from "@app/page/encoder-decoder";
import Generators from "@app/page/generators";
import Text from "@app/page/text";
import TimeTools from "@app/page/time/time";
import Transforms from "@app/page/transforms/list";

const JwtDecoder = lazy(() => import("@app/page/jwt-decoder"));
const Base64Image = lazy(() => import("@app/page/base64-image"));
const Base64Text = lazy(() => import("@app/page/base64-text"));
const TextReplacer = lazy(() => import("@app/page/text-replacer"));
const HTML_JSX = lazy(() => import("@app/page/html-jsx"));
const SCSS_CSS = lazy(() => import('@app/page/transforms/scss-css'))
const Base64URL = lazy(() => import("@app/page/base64-url"));
const UuidGenerator = lazy(() => import("@app/page/uuid-generator"));
const ObjectIdGenerator = lazy(() => import("@app/page/object-id-generator"));
const LoremTextGenerator = lazy(
  () => import("@app/page/generators/lorem-text")
);
const FakeData = lazy(() => import("@app/page/generators/fake-data"));
const WorldTime = lazy(() => import("@app/page/time/world-time"));

export const CATEGORIES: ICategory[] = [
  {
    path: CATEGORIES_KEY.all,
    title: "All extensions",
    icon: "home",
    page: <All />,
  },
  {
    path: CATEGORIES_KEY.transform,
    title: 'Transform tools',
    icon: 'arrow-right-left',
    page: <Transforms />
  },
  {
    path: CATEGORIES_KEY.text,
    title: "Text extensions",
    icon: "remove-formatting",
    page: <Text />,
  },
  {
    path: CATEGORIES_KEY.encode_decode,
    title: "Encoder/ Decoder",
    icon: "key-round",
    page: <EncoderDecoder />,
  },
  {
    path: CATEGORIES_KEY.generators,
    title: "Generators Sample",
    icon: "package",
    page: <Generators />,
  },
  {
    path: CATEGORIES_KEY.time,
    title: "Time Tools",
    icon: "clock-2",
    page: <TimeTools />,
  },
];

export const EXTENSIONS_TEXT: IExtension[] = [
  {
    category: CATEGORIES_KEY.text,
    path: "text-formatter",
    title: "Text Formatter",
    icon: "case-sensitive",
    key: EXTENSION_KEY.text_formatter,
    page: <JwtDecoder />,
    keywords: ["formatter", "text", "uppercase", "lowercase"],
  },
  {
    category: CATEGORIES_KEY.text,
    path: "text-replacer",
    title: "Text Replacer",
    icon: "remove-formatting",
    key: EXTENSION_KEY.text_replacer,
    page: <TextReplacer />,
  },
];

export const EXTENSIONS_GENERATORS: IExtension[] = [
  {
    category: CATEGORIES_KEY.generators,
    path: "uuid",
    title: "UUID Generator",
    key: EXTENSION_KEY.uuid,
    icon: "key-square",
    page: <UuidGenerator />,
    keywords: ["UUID Generator", "id"],
  },
  {
    category: CATEGORIES_KEY.generators,
    path: "object_id",
    title: "Mongo ObjectId",
    key: EXTENSION_KEY.object_id,
    iconNode: <SiMongodb />,
    page: <ObjectIdGenerator />,
    keywords: ["Mongo ObjectID Generator", "id"],
  },
  {
    category: CATEGORIES_KEY.generators,
    path: "lorem_text",
    title: "Lorem text",
    key: EXTENSION_KEY.lorem_text,
    icon: "text-select",
    page: <LoremTextGenerator />,
    keywords: [
      'Lorem text Generator',
      'sample text',
      'text generator',
      'lorem ipsum'
    ]
  },
  {
    category: CATEGORIES_KEY.generators,
    path: "fake_data",
    title: "Fake Data",
    key: EXTENSION_KEY.fake_data,
    icon: "stamp",
    page: <FakeData />,
    keywords: ["Fake data", "lorem data", "data generator"],
  },
  {
    category: CATEGORIES_KEY.generators,
    path: "fake_from_interface",
    title: "Fake From Interface",
    key: EXTENSION_KEY.fake_from_interface,
    icon: "printer",
    page: <LoremTextGenerator />,
    keywords: [
      "Fake data from typescript interface",
      "lorem data",
      "data generator",
    ],
    incomplete: true,
  },
];

export const EXTENSIONS_TRANSFORM: IExtension[] = [
  {
    category: CATEGORIES_KEY.transform,
    path: "html-jsx",
    title: "HTML ⇌ JSX",
    alt: "{/>",
    key: EXTENSION_KEY.html_jsx,
    page: <HTML_JSX />,
    keywords: ["html to jsx", "jsx to html", "html to react"],
  },
  {
    category: CATEGORIES_KEY.transform,
    path: "json_ts",
    title: "JSON to TS Interface",
    icon: "align-horizontal-justify-center",
    key: EXTENSION_KEY.json_ts,
    page: <HTML_JSX />,
    keywords: ['JSON to TS interface'],
    incomplete: true,
  },
  {
    category: CATEGORIES_KEY.transform,
    path: 'scss_css',
    title: 'SCSS to CSS',
    iconNode: <SiSass size={22} />,
    key: EXTENSION_KEY.scss_css,
    page: <SCSS_CSS />,
    keywords: ['SASS to CSS', 'SCSS to CSS']
  }
]

export const EXTENSIONS_ENCODE_DECODE: IExtension[] = [
  {
    category: CATEGORIES_KEY.encode_decode,
    path: "jwt-decode",
    title: "JWT Decoder",
    icon: "asterisk",
    key: EXTENSION_KEY.jwt_decode,
    page: <JwtDecoder />,
  },
  {
    category: CATEGORIES_KEY.encode_decode,
    path: "base64-text",
    title: "Base64 Text",
    alt: "64",
    key: EXTENSION_KEY.base64_text,
    page: <Base64Text />,
  },
  {
    category: CATEGORIES_KEY.encode_decode,
    path: "base64-image",
    title: "Base64 Image",
    icon: "image",
    key: EXTENSION_KEY.base64_image,
    page: <Base64Image />,
  },
  {
    category: CATEGORIES_KEY.encode_decode,
    path: "base64-url",
    title: "Base64 URL",
    icon: "link",
    key: EXTENSION_KEY.base64_url,
    page: <Base64URL />,
  },
];

export const TIME_EXTENSIONS: IExtension[] = [
  {
    category: CATEGORIES_KEY.time,
    path: "world_clock",
    title: "World Clocks",
    icon: "earth",
    key: EXTENSION_KEY.world_clock,
    page: <WorldTime />,
  },
];
export const EXTENSIONS: IExtension[] = [
  ...EXTENSIONS_TEXT,
  ...EXTENSIONS_GENERATORS,
  ...EXTENSIONS_TRANSFORM,
  ...EXTENSIONS_ENCODE_DECODE,
  ...TIME_EXTENSIONS,
];
