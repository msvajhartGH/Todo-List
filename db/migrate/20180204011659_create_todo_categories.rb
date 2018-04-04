class CreateTodoCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :todo_categories do |t|
      t.integer :CategoryID
      t.string :Name

      t.timestamps
    end
  end
end
