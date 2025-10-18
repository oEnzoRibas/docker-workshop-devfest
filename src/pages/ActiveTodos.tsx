import { useTodos } from "@/contexts/TodoContext";
import { AddTodoForm } from "@/components/AddTodoForm";
import { TodoItem } from "@/components/TodoItem";

const ActiveTodos = () => {
  const { todos } = useTodos();
  const activeTodos = todos.filter((todo) => !todo.completed);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Tarefas Ativas</h1>
        <p className="text-muted-foreground">
          {activeTodos.length} {activeTodos.length === 1 ? "tarefa" : "tarefas"} pendente
          {activeTodos.length !== 1 ? "s" : ""}
        </p>
      </div>

      <AddTodoForm />

      <div className="space-y-3">
        {activeTodos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma tarefa ativa. Você está em dia! 🎉
            </p>
          </div>
        ) : (
          activeTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
};

export default ActiveTodos;
