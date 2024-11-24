export enum JobStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ON_HOLD = 'ON_HOLD',
}

export interface Job {
  id?: string;
  carId: string;
  description: string;
  status: JobStatus;
  startDate: Date;
  estimatedCompletionDate: Date;
  actualCompletionDate?: Date;
  cost: number;
  notes?: string;
  mechanicName: string;
}
