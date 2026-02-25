import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Lead {
    id: string;
    name: string;
    createdAt: bigint;
    email: string;
    message: string;
    phone: string;
    budget: string;
}
export interface Property {
    id: string;
    title: string;
    createdAt: bigint;
    description: string;
    imageUrl: string;
    price: string;
    location: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createLead(name: string, phone: string, email: string, budget: string, message: string): Promise<void>;
    createProperty(title: string, location: string, price: string, imageUrl: string, description: string): Promise<string>;
    deleteProperty(id: string): Promise<void>;
    getAllLeads(): Promise<Array<Lead>>;
    getAllProperties(): Promise<Array<Property>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProperty(id: string): Promise<Property>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateProperty(id: string, title: string, location: string, price: string, imageUrl: string, description: string): Promise<boolean>;
}
