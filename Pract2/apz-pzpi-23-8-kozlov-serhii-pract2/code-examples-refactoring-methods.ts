
console.log("--- МЕТОД 1 (ДО): string замість об'єкта ---");

namespace Method1_Before {
  export class Task {
    title: string;
    priority: string; // "High", "Medium", "Low"

    constructor(title: string, priority: string) {
      this.title = title;
      this.priority = priority;
    }
  }

  export function getPriorityColor(task: Task): string {
    if (task.priority === "High") return "#FF0000";
    if (task.priority === "Medium") return "#FFA500";
    return "#00FF00";
  }

  const task1 = new Task("Зробити звіт", "High");
  console.log(`Колір для "${task1.title}": ${getPriorityColor(task1)}`);
}

console.log("\n--- МЕТОД 1 (ПІСЛЯ): Використання об'єкта Priority ---");

namespace Method1_After {
  export class Priority {
    private value: string;
    constructor(value: string) {
      this.value = value;
    }

    toString(): string {
      return this.value;
    }

    getColor(): string {
      if (this.value === "High") return "#FF0000";
      if (this.value === "Medium") return "#FFA500";
      return "#00FF00";
    }
  }

  export class Task {
    title: string;
    priority: Priority; // Тепер це об'єкт!
    constructor(title: string, priority: Priority) {
      this.title = title;
      this.priority = priority;
    }
  }

  const task1 = new Task("Зробити звіт", new Priority("High"));
  console.log(`Колір для "${task1.title}": ${task1.priority.getColor()}`);
}

// ===================================================================
// МЕТОД 2: Encapsulate Collection
// ===================================================================

console.log("\n--- МЕТОД 2 (ДО): Публічна колекція ---");

namespace Method2_Before {
  export class Course {
    public students: string[] = [];
  }

  const oop = new Course();
  oop.students.push("Ivan");
  console.log(oop.students);
  oop.students = [];
  console.log(oop.students);
}

console.log("\n--- МЕТОД 2 (ПІСЛЯ): Інкапсульована колекція ---");

namespace Method2_After {
  export class Course {
    private _students: string[] = [];

    public addStudent(name: string) {
      if (this._students.length >= 30) {
        throw new Error("Курс заповнений");
      }
      this._students.push(name);
    }

    public getStudents(): readonly string[] {
      return [...this._students];
    }
  }

  const oop = new Course();
  oop.addStudent("Ivan");
  console.log(oop.getStudents());
}

// ===================================================================
// МЕТОД 3: Replace Conditional with Polymorphism
// ===================================================================

console.log("\n--- МЕТОД 3 (ДО): Умовна логіка switch ---");

namespace Method3_Before {
  export interface User {
    type: "Admin" | "Editor" | "Viewer";
    baseRate: number;
  }

  export function calculatePayment(user: User): number {
    switch (user.type) {
      case "Admin":
        return user.baseRate * 1.5;
      case "Editor":
        return user.baseRate * 1.2;
      case "Viewer":
        return user.baseRate * 1.0;
      default:
        throw new Error("Unknown user type");
    }
  }

  const admin: User = { type: "Admin", baseRate: 100 };
  const editor: User = { type: "Editor", baseRate: 100 };
  console.log(`ЗП Адміна (до): ${calculatePayment(admin)}`);
  console.log(`ЗП Редактора (до): ${calculatePayment(editor)}`);
}

console.log("\n--- МЕТОД 3 (ПІСЛЯ): Поліморфізм ---");

namespace Method3_After {
  export abstract class User {
    baseRate: number;
    abstract getPayment(): number;
  }

  export class Admin extends User {
    getPayment(): number {
      return this.baseRate * 1.5;
    }
  }
  export class Editor extends User {
    getPayment(): number {
      return this.baseRate * 1.2;
    }
  }
  export class Viewer extends User {
    getPayment(): number {
      return this.baseRate * 1.0;
    }
  }

  const admin: User = new Admin();
  admin.baseRate = 100;
  const editor: User = new Editor();
  editor.baseRate = 100;

  console.log(`ЗП Адміна (після): ${admin.getPayment()}`);
  console.log(`ЗП Редактора (після): ${editor.getPayment()}`);
}
