import { createSerializer } from "@emotion/jest";
import fetch from "jest-fetch-mock";

expect.addSnapshotSerializer(createSerializer());

global.fetch = fetch;
