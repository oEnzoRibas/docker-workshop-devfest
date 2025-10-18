import { useTodos } from "@/contexts/TodoContext";
import { AddTodoForm } from "@/components/AddTodoForm";
import { TodoItem } from "@/components/TodoItem";
import { StatsCards } from "@/components/StatsCards";

const AllTodos = () => {
  const { todos } = useTodos();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Todas as Tarefas</h1>
        <p className="text-muted-foreground">Gerencie todas as suas tarefas em um só lugar</p>
      </div>

      <StatsCards />
      <AddTodoForm />

      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma tarefa ainda. Comece adicionando uma nova!
            </p>
          </div>
        ) : (
          todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
};

export default AllTodos;
