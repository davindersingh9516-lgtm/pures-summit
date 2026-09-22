import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/build-metadata";
import { createMockSEO } from "@/mocks/seo.mock";
import { AppLink } from "@/components/global/app-link";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/constants/routes.constants";
import { authRepository } from "@/repositories";
import { getAuthToken } from "@/lib/auth-session";
import { LoginForm } from "@/features/account/components/login-form";
import { LogoutButton } from "@/features/account/components/logout-button";

function getAccountSEO() {
  return createMockSEO({
    path: "/account",
    title: "My Account | Pure Summit",
    description: "Sign in to view your Pure Summit orders and account details.",
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(getAccountSEO());
}

export default async function AccountPage() {
  const token = await getAuthToken();
  const customer = token ? await authRepository.getCurrentCustomer(token).catch(() => null) : null;

  if (!customer) {
    return (
      <Container size="page" className="py-16">
        <LoginForm />
      </Container>
    );
  }

  return (
    <Container size="page" className="flex flex-col gap-8 py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-(--color-foreground)">My Account</h1>
          <p className="mt-1 text-(--color-foreground-muted)">
            {customer.firstName ? `Welcome back, ${customer.firstName}.` : customer.email}
          </p>
        </div>
        <LogoutButton />
      </div>

      <AppLink
        href={ROUTES.accountOrders()}
        className="w-fit rounded-(--radius-lg) border border-(--color-border) bg-(--color-brand-50) px-6 py-4 text-(--color-foreground) transition-colors hover:border-(--color-primary)"
      >
        <span className="font-medium">Order History</span>
        <span className="block text-sm text-(--color-foreground-muted)">View past orders and their status</span>
      </AppLink>
    </Container>
  );
}
