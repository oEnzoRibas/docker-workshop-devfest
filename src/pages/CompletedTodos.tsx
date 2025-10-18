import { useTodos } from "@/contexts/TodoContext";
import { TodoItem } from "@/components/TodoItem";

const CompletedTodos = () => {
  const { todos } = useTodos();
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Tarefas Concluídas</h1>
        <p className="text-muted-foreground">
          {completedTodos.length} {completedTodos.length === 1 ? "tarefa concluída" : "tarefas concluídas"}
        </p>
      </div>

      <div className="space-y-3">
        {completedTodos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma tarefa concluída ainda. Continue trabalhando!
            </p>
          </div>
        ) : (
          completedTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  );
};

export default CompletedTodos;
