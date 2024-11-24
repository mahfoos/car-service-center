export enum CarStatus {
  WAITING = 'WAITING',
  IN_SERVICE = 'IN_SERVICE',
  COMPLETED = 'COMPLETED',
  DELIVERED = 'DELIVERED',
}

export interface Car {
  id?: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  ownerName: string;
  ownerContact: string;
  dateAdded: Date;
  status: CarStatus;
}
