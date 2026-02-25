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
    propertyType: PropertyType;
    name: string;
    createdAt: bigint;
    email: string;
    message: string;
    phone: string;
    budget: bigint;
}
export interface Property {
    id: string;
    features: Array<string>;
    propertyType: PropertyType;
    bedrooms: bigint;
    name: string;
    createdAt: bigint;
    sqft: bigint;
    imageUrl: string;
    category: PropertyCategory;
    price: bigint;
    location: string;
}
export interface UserProfile {
    name: string;
}
export enum PropertyCategory {
    featured = "featured",
    land = "land"
}
export enum PropertyType {
    commercial = "commercial",
    villa = "villa",
    penthouse = "penthouse",
    land = "land"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createLead(name: string, phone: string, email: string, budget: bigint, propertyType: PropertyType, message: string): Promise<void>;
    createProperty(property: Property): Promise<void>;
    deleteProperty(id: string): Promise<void>;
    getAllProperties(): Promise<Array<Property>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedProperties(): Promise<Array<Property>>;
    getLeads(): Promise<Array<Lead>>;
    getPropertiesByCategory(category: PropertyCategory): Promise<Array<Property>>;
    getPropertiesByType(propertyType: PropertyType): Promise<Array<Property>>;
    getProperty(id: string): Promise<Property | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateProperty(id: string, property: Property): Promise<void>;
}
