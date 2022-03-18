export interface ILogEntry {
  [id: string];
}

export interface ILogJSON {
  logs: ILogEntry;
  id: string;
}

export interface IFrequency {
  [email: string]: number;
}

interface ITallyEntry {
  email: string;
  total: number;
}

interface ITally extends Array<ITallyEntry> {}
