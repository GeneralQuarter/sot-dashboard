export type Commendation = {
  title: string;
  subtitle: string;
  image: string;
  completed: boolean;
  scalar?: {
    value: number;
    maxValue: number;
    grades?: number[];
  }
}
