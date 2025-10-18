import { useState } from "react";
import { Plus } from "lucide-react";
import { useTodos } from "@/contexts/TodoContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export const AddTodoForm = () => {
  const { addTodo } = useTodos();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title.trim(), description.trim() || undefined);
      setTitle("");
      setDescription("");
      setIsExpanded(false);
    }
  };

  return (
    <Card className="p-4 mb-6 shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Adicionar nova tarefa..."
            className="flex-1"
          />
          <Button type="submit" disabled={!title.trim()} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar
          </Button>
        </div>
        
        {isExpanded && (
          <div className="mt-3 space-y-2">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição (opcional)"
              rows={2}
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                setIsExpanded(false);
                setDescription("");
              }}
            >
              Cancelar
            </Button>
          </div>
        )}
      </form>
    </Card>
  );
};
