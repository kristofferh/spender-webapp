import fetch from "jest-fetch-mock";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

global.fetch = fetch;
