export interface IChip {
  id: string;
  label: string;
}

export interface IFilter {
  label: string;
  id: string;
  chips: IChip[];
}
