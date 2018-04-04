Rails.application.routes.draw do
  resources :todo_categories
  resources :todos
  namespace :api do
    resources :todos, only: [:index, :create, :destroy, :update]
    resources :todo_categories, only: [:index, :create, :destroy, :update]
  end
  namespace :views do
    resources :todos, only: [:index]
    resources :todo_categories, only: [:index]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
