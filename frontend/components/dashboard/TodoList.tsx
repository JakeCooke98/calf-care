"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const todos = [
  { id: 1, text: "Milk Feeding - Pen A", completed: false },
  { id: 2, text: "Vaccinations - Pen B", completed: true },
  { id: 3, text: "Health Checkups - All Pens", completed: false },
  { id: 4, text: "Clean Feeding Equipment", completed: false },
  { id: 5, text: "Update Calf Records", completed: true },
];

export default function TodoList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center space-x-2 mb-2">
            <Checkbox id={`todo-${todo.id}`} checked={todo.completed} />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                todo.completed ? 'line-through text-gray-500' : ''
              }`}
            >
              {todo.text}
            </label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}