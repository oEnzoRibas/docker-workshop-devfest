import { Check, Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import { Todo, useTodos } from "@/contexts/TodoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || "");

  const handleSave = () => {
    updateTodo(todo.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Card className="p-4 transition-all duration-200 hover:shadow-lg">
        <Input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="mb-2"
          placeholder="Título da tarefa"
        />
        <Textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="mb-3"
          placeholder="Descrição (opcional)"
        />
        <div className="flex gap-2">
          <Button onClick={handleSave} size="sm" variant="default">
            Salvar
          </Button>
          <Button onClick={() => setIsEditing(false)} size="sm" variant="secondary">
            Cancelar
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`p-4 transition-all duration-200 hover:shadow-lg group ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => toggleTodo(todo.id)}
          className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? "bg-success border-success"
              : "border-muted-foreground hover:border-primary"
          }`}
        >
          {todo.completed && <Check className="w-3 h-3 text-success-foreground" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3
            className={`font-medium transition-all duration-200 ${
              todo.completed ? "line-through text-muted-foreground" : "text-foreground"
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p className="text-sm text-muted-foreground mt-1">{todo.description}</p>
          )}
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTodo(todo.id)}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
