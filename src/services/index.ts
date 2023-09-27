import { AuthService } from "./auth.service";
import { MedicationRecordService } from "./medication-record.service";
import { MedicineService } from "./medicine.service";
import { UserService } from "./user.service";

export const authService = new AuthService(process.env.API_HOSTNAME);
export const userService = new UserService(process.env.API_HOSTNAME);
export const medicineService = new MedicineService(process.env.API_HOSTNAME);
export const medicationRecordService = new MedicationRecordService(
  process.env.API_HOSTNAME
);
