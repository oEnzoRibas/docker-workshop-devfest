import { CheckCircle2, Circle, ListTodo } from "lucide-react";
import { useTodos } from "@/contexts/TodoContext";
import { Card } from "@/components/ui/card";

export const StatsCards = () => {
  const { todos } = useTodos();
  
  const totalTodos = todos.length;
  const activeTodos = todos.filter(t => !t.completed).length;
  const completedTodos = todos.filter(t => t.completed).length;

  const stats = [
    {
      label: "Total",
      value: totalTodos,
      icon: ListTodo,
      color: "text-primary"
    },
    {
      label: "Ativas",
      value: activeTodos,
      icon: Circle,
      color: "text-primary"
    },
    {
      label: "Concluídas",
      value: completedTodos,
      icon: CheckCircle2,
      color: "text-success"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            </div>
            <stat.icon className={`w-10 h-10 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
};
