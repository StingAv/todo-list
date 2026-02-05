const log = console.log;

class LocalStorage {
  #keyName;

  constructor(keyName) {
    this.#keyName = keyName;
  }

  GetItem() {
    const items = localStorage.getItem(this.#keyName);
    return items ? JSON.parse(items) : [];
  }

  SetItem(itemsList) {
    localStorage.setItem(this.#keyName, JSON.stringify(itemsList));
  }
}

class DOM {
  query(selector) {
    return document.querySelector(selector);
  }

  create(type, textContent, ...classNames) {
    const item = document.createElement(type);
    item.textContent = textContent;
    item.classList.add(...classNames);
    return item;
  }
}

class Item {
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

class TodoItem extends Item {
  constructor(id, text, completed = false) {
    super(id, text);
    this.completed = completed;
  }
}

class TodoApp {
  constructor() {
    this.dom = new DOM();
    this.todosStorage = new LocalStorage("todos");

    this.todoList = this.todosStorage.GetItem();
    this.todoInput = this.dom.query("[data-add-todo-input]");
    this.todoListContainer = this.dom.query("[data-todo-container]");
    this.bindEvents();
    this.render();
  }

  addTodo(text) {
    const newTodo = new TodoItem(Date.now(), text);

    this.todoList.push(newTodo);
    this.render();
    this.todosStorage.SetItem(this.todoList);
  }

  removeTodo(id) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
    this.todosStorage.SetItem(this.todoList);
    this.render();
  }

  toggleTodo(id) {
    const todo = this.todoList.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.todosStorage.SetItem(this.todoList);
      this.render();
    }
  }

  bindEvents() {
    this.todoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && this.todoInput.value.trim()) {
        this.addTodo(this.todoInput.value.trim());
        this.todoInput.value = "";
      }
    });

    this.todoListContainer.addEventListener("click", (e) => {
      const el = e.target;

      if (el.classList.contains("remove-btn")) {
        const id = Number(el.dataset.id);
        this.removeTodo(id);
      } else if (el.classList.contains("todo-item")) {
        const id = Number(el.dataset.id);
        this.toggleTodo(id);
      }
    });
  }

  render() {
    this.todoListContainer.innerHTML = "";

    this.todoList.forEach((todo) => {
      const todoItem = this.dom.create("div", "", "todo-item", todo.completed ? "completed" : undefined);
      todoItem.dataset.id = todo.id;
      const todoItemText = this.dom.create("span", todo.text)

      const removeBtn = this.dom.create("button", "Удалить", "remove-btn", todo.completed ? "completed" : undefined);
      removeBtn.dataset.id = todo.id;
      removeBtn.disabled = !todo.completed;

      todoItem.appendChild(todoItemText);
      todoItem.appendChild(removeBtn);
      this.todoListContainer.appendChild(todoItem);
    });
  }
}

new TodoApp();
