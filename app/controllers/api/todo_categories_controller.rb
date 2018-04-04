module Api
    class TodoCategoriesController < ApplicationController
    skip_before_filter :verify_authenticity_token
      def index
        @catList = TodoCategory.find_by_sql("SELECT * FROM todo_categories")
        render json: @catList
      end

      def create
        @catItem = TodoCategory.create(cat_params)
        render json: @catItem
      end
      
      private
      
        def cat_params
          params.require(:catItem).permit(:CategoryID, :Name )
        end
    end
  end