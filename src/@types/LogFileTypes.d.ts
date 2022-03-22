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

export interface ITallyEntry {
  email: string;
  total: number;
}

export interface ITally extends Array<ITallyEntry> {}
