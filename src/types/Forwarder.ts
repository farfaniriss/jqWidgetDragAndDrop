import { Service } from "@/types/Service";
import { Division } from "@/types/Division";

export interface Forwarder {
    forwarderId: string,
    name: string,
    services: Array<Service>,
    divisions: Array<Division>
}
