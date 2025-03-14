import { NewCustomer } from "../shared/types/NewCustomer.type";

export class Customer {
    public name: string;
    public address?: string;
    public email: string;
    public role: string;
    public phone?: string;
    public status: boolean;

    constructor({ name, address, email, role, phone, status }: NewCustomer) {
        this.name = name;
        this.address = address;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.status = status;
    }
}