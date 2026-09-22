import type { IAuthRepository } from "../interfaces";
import type { AuthSession, Customer, Order } from "@/types";
import { graphqlRequest } from "@/graphql/client";
import { GET_CUSTOMER_ORDERS_QUERY, GET_VIEWER_QUERY, LOGIN_MUTATION } from "@/graphql/queries/auth.queries";
import { mapWooCustomer, type WPCustomerNode } from "@/graphql/mappers/auth.mapper";
import { mapWooOrder, type WPOrderNode } from "@/graphql/mappers/order.mapper";

function authHeader(authToken: string) {
  return { Authorization: `Bearer ${authToken}` };
}

export class GraphQLAuthRepository implements IAuthRepository {
  async login(username: string, password: string): Promise<AuthSession> {
    const data = await graphqlRequest<{
      login: { authToken: string; refreshToken: string; customer: WPCustomerNode };
    }>(LOGIN_MUTATION, { username, password });

    return {
      authToken: data.login.authToken,
      refreshToken: data.login.refreshToken,
      customer: mapWooCustomer(data.login.customer),
    };
  }

  async getCurrentCustomer(authToken: string): Promise<Customer | null> {
    const data = await graphqlRequest<{ customer: WPCustomerNode | null }>(GET_VIEWER_QUERY, undefined, {
      headers: authHeader(authToken),
    });
    return data.customer ? mapWooCustomer(data.customer) : null;
  }

  async getOrders(authToken: string): Promise<Order[]> {
    const data = await graphqlRequest<{ customer: { orders: { nodes: WPOrderNode[] } } | null }>(
      GET_CUSTOMER_ORDERS_QUERY,
      undefined,
      { headers: authHeader(authToken) },
    );
    return (data.customer?.orders.nodes ?? []).map(mapWooOrder);
  }
}
