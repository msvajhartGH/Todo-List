class TodosController < ApplicationController
    def index
        @Todos = Todo.find_by_sql("SELECT * FROM todos")
        @TodoCats = TodoCategory.find_by_sql(" SELECT * FROM todo_categories")
    end
end
