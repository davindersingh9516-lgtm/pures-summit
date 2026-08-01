import type { IAnnouncementRepository } from "../interfaces";
import { notImplemented } from "./not-implemented";

/** Future implementation: call `graphqlRequest(GET_ANNOUNCEMENT_BAR_QUERY)`
 * and map onto `AnnouncementBarData`. */
export class GraphQLAnnouncementRepository implements IAnnouncementRepository {
  async getAnnouncementBar(): ReturnType<IAnnouncementRepository["getAnnouncementBar"]> {
    notImplemented("getAnnouncementBar", "GET_ANNOUNCEMENT_BAR_QUERY");
  }
}
