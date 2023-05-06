export interface ClientOrderModel {
    id: number;
    clientId: number;
    description: string;
    comment: string;
    bill: number | null;
    expenses: number | null;
}