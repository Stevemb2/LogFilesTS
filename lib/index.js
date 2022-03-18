var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from "path";
import { readdir, readFile } from "fs/promises";
import { Tally } from "./Tally.js";
const processLogFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    const directoryPath = path.join(".", path.sep, "logs");
    try {
        const tally = new Tally();
        const fileNameArray = yield readdir(directoryPath);
        for (let i = 0; i < fileNameArray.length; i++) {
            const fileName = fileNameArray[i];
            const filePath = path.join(directoryPath, path.sep, fileName);
            const jsonMessage = yield readFile(filePath, "utf-8");
            if (jsonMessage) {
                console.log(jsonMessage);
                const logJSON = JSON.parse(jsonMessage);
                const logFileTallyMessage = tally.logFileTally(logJSON);
                console.log(logFileTallyMessage);
                const globalTallyMessage = tally.updateGlobalTally();
                console.log(globalTallyMessage);
            }
            else {
                console.error(`${filePath} has no content`);
            }
        }
    }
    catch (err) {
        console.error(`Error: ${err}`);
    }
});
processLogFiles();
//# sourceMappingURL=index.js.map