import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import Notification from "../infra/typeorm/schemas/Notification";
import ICreateNotificationDTO from "../dtos/ICreateNotificationDTO";

export default interface INotificationRepository{
  create(data: ICreateNotificationDTO): Promise<Notification>
}
