// src/types/User.ts
export interface Billing {
    id: string;  // Assuming 'id' is a string, adjust type if it's different
    name: string;
    reading: number;
    paymenmtStatus: string;
    user: any;
    value: number;
    month: string;
    // Add other properties as needed, e.g., email: string;
}