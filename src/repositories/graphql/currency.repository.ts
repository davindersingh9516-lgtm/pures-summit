import type { ICurrencyRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/** Future implementation: call `graphqlRequest(GET_CURRENCIES_QUERY)` and
 * map onto `Currency[]`. */
export class GraphQLCurrencyRepository implements ICurrencyRepository {
  async getCurrencies(): ReturnType<ICurrencyRepository["getCurrencies"]> {
    notImplemented("getCurrencies", "GET_CURRENCIES_QUERY");
  }
}
