import path from "path";
import { readdir, readFile } from "fs/promises";
import { Tally } from "./Tally.js";
import { ILogJSON } from "./@types/LogFileTypes";

const processLogFiles = async () => {
  const directoryPath = path.join(".", "logs");

  try {
    const tally = new Tally();

    const fileNameArray = await readdir(directoryPath);

    for (let i = 0; i < fileNameArray.length; i++) {
      const fileName = fileNameArray[i];
      const filePath = path.join(directoryPath, fileName);

      const jsonMessage = await readFile(filePath, "utf-8");

      if (jsonMessage) {
        console.log(jsonMessage);

        const logJSON: ILogJSON = JSON.parse(jsonMessage);

        const logFileTallyMessage = tally.logFileTally(logJSON);

        console.log(logFileTallyMessage);

        const globalTallyMessage = tally.updateGlobalTally();

        console.log(globalTallyMessage);
      } else {
        console.error(`${filePath} has no content`);
      }
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};

processLogFiles();
