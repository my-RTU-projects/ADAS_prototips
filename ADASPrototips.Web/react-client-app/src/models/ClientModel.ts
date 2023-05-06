import { ClientOrderModel } from "./ClientOrderModel";

export interface ClientModel {
    id: number;
    name: string;
    phone: string;
    orders: ClientOrderModel[] | null;
}