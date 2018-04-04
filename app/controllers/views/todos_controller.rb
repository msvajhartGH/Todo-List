module Views
    class TodosController < ApplicationController
      def index
        @todoLists = Todo.find_by_sql("SELECT * FROM todos as t INNER JOIN todo_categories as tc ON t.CategoryID = tc.CategoryID")
        render json: @todoLists
      end
    end
  end