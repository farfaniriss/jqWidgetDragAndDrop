import { Service } from "@/types/Service";

export interface Division {
    code: string,
    name: string,
    countryCode: string,
    forwarderId: string,
    services: Array<Service>
}
