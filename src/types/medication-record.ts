import { Medicine } from "./medicine";
import { User } from "./user";

export interface MedicationRecordItem {
  medicine: Medicine;
  tablets: number;
  startTime: string;
  endTime: string;
  takeSchedule: string;
  mg: number;
  startDateTime: Date;
  endDateTime: Date;
}

export interface MedicationRecord {
  id: string;
  user: User;
  items: MedicationRecordItem[];
  issueAt: Date;
  createdAt: Date;
}
