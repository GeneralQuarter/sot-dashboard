export type CommendationScalar = {
  value: number;
  maxValue: number;
  grades?: number[];
};

export type Commendation = {
  title: string;
  subtitle: string;
  image: string;
  completed: boolean;
  scalar?: CommendationScalar;
}
