import { createFileRoute } from "@tanstack/react-router";

import TodosPage from "@/features/todo/pages/todos-page";

export const Route = createFileRoute("/todos")({
  component: TodosPage,
});
