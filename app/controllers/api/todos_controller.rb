module Api
    class TodosController < ApplicationController
    skip_before_filter :verify_authenticity_token
      def index
        @todoLists = Todo.find_by_sql("SELECT * FROM todos")
        render json: @todoLists
      end

      def create
        @todoItem = Todo.create(todo_params)
        render json: @todoItem
      end
      
      private
      
        def todo_params
          params.require(:todoItem).permit(:CategoryID, :Title, :Description, :Completed )
        end
    end
  end