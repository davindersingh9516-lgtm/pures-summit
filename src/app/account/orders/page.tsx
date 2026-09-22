import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { createMockSEO } from "@/mocks/seo.mock";
import { Container } from "@/components/ui/container";
import { AppLink } from "@/components/global/app-link";
import { ROUTES } from "@/constants/routes.constants";
import { authRepository } from "@/repositories";
import { getAuthToken } from "@/lib/auth-session";

function getOrdersSEO() {
  return createMockSEO({
    path: "/account/orders",
    title: "Order History | Pure Summit",
    description: "View your past Pure Summit orders.",
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(getOrdersSEO());
}

export default async function AccountOrdersPage() {
  const token = await getAuthToken();
  if (!token) redirect(ROUTES.account());

  const orders = await authRepository.getOrders(token).catch(() => []);

  return (
    <Container size="page" className="flex flex-col gap-8 py-16">
      <div>
        <AppLink href={ROUTES.account()} className="text-sm text-(--color-foreground-muted) hover:text-(--color-foreground)">
          ← My Account
        </AppLink>
        <h1 className="mt-2 text-3xl font-semibold text-(--color-foreground)">Order History</h1>
      </div>

      {orders.length === 0 ? (
        <p className="text-(--color-foreground-muted)">You haven&apos;t placed any orders yet.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-(--color-border) rounded-(--radius-lg) border border-(--color-border)">
          {orders.map((order) => (
            <li key={order.id} className="flex flex-wrap items-center justify-between gap-2 p-4">
              <div>
                <p className="font-medium text-(--color-foreground)">Order #{order.orderNumber}</p>
                <p className="text-sm text-(--color-foreground-muted)">
                  {new Date(order.createdAt).toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" })}
                  {" · "}
                  {order.status}
                </p>
              </div>
              <span className="font-medium text-(--color-foreground)">{order.total.formatted}</span>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
