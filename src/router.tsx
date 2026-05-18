import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const queryClient = new QueryClient();

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="font-display text-8xl text-[var(--orange)]">404</h1>
          <h2 className="mt-4 text-xl font-semibold">Страница не найдена</h2>
          <a href="/" className="mt-6 inline-flex items-center justify-center px-5 h-11 bg-[var(--orange)] text-asphalt text-sm font-semibold uppercase tracking-wider">
            На главную
          </a>
        </div>
      </div>
    ),
  });

  return router;
};
