type CustomerProps = {
    _id?: string;
    name: string;
    address?: string;
    email: string;
    role: string;
    phone?: string;
    status: boolean;
}

export class Customer {
    public _id?: string;
    public name: string;
    public address?: string;
    public email: string;
    public role: string;
    public phone?: string;
    public status: boolean;

    constructor({ _id, name, address, email, role, phone, status }: CustomerProps) {
        this._id = _id;
        this.name = name;
        this.address = address;
        this.email = email;
        this.role = role;
        this.phone = phone;
        this.status = status;
    }
}