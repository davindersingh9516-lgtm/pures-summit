import type { Customer } from "@/types";

export interface WPCustomerNode {
  id: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
}

export function mapWooCustomer(node: WPCustomerNode): Customer {
  return {
    id: node.id,
    email: node.email ?? "",
    firstName: node.firstName ?? undefined,
    lastName: node.lastName ?? undefined,
  };
}
