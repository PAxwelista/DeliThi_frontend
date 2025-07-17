export type Customer = {
    _id: string;
    name: string;
    phoneNumber: string;
    location: { name: string; area: string; longitude: number; latitude: number };
    email: string
    group:string
};
