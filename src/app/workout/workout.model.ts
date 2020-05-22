import { WodResult } from "./wodresult.model";

export interface Workout {
  id: string;
  title: string;
  description: string;
  dateOfWorkout: Date;
  videoUrl: string;
  results: WodResult[];
}
