module Views
    class TodoCategoriesController < ApplicationController
      def index
        @catList = TodoCategory.find_by_sql("SELECT * FROM todo_categories")
        render json: @catList
      end
    end
  end