import fetch from "jest-fetch-mock";
import serializer from "jest-emotion";

expect.addSnapshotSerializer(serializer);

global.fetch = fetch;
