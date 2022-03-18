import { ILogJSON, ILogEntry, IFrequency, ITally } from "./@types/LogFileTypes";

export class Tally {
  tally: ITally;
  globalTally: ITally;

  constructor() {
    this.tally = [];
    this.globalTally = [];
  }

  logFileTally(logJSON: ILogJSON) {
    this.tally = [];
    const frequency: IFrequency = {};

    logJSON.logs.forEach((entry: ILogEntry) => {
      frequency[entry.email] = frequency[entry.email] + 1 || 1;
    });

    Object.entries(frequency).forEach((entry) => {
      this.tally.push({ email: entry[0], total: entry[1] });
    });

    const tallyMessage = `Log File Tally: ${JSON.stringify(
      {
        logs_id: logJSON.id,
        tally: this.tally,
      },
      null,
      4
    )}`;

    return tallyMessage;
  }

  updateGlobalTally() {
    if (this.globalTally && this.globalTally.length === 0) {
      this.globalTally = this.tally;
    } else {
      this.globalTally = this.globalTally.concat(this.tally);

      const frequency: IFrequency = {};

      this.globalTally.forEach((entry) => {
        frequency[entry.email] =
          frequency[entry.email] + entry.total || entry.total;
      });

      const updatedTally: ITally = [];

      Object.entries(frequency).forEach((entry) => {
        updatedTally.push({ email: entry[0], total: entry[1] });
      });

      this.globalTally = updatedTally;
    }

    const globalTallyMessage = `Global Tally: ${JSON.stringify(
      this.globalTally,
      null,
      4
    )}`;

    return globalTallyMessage;
  }
}
