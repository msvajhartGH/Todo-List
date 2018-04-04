class CreateTodos < ActiveRecord::Migration[5.0]
  def change
    create_table :todos do |t|
      t.integer :CategoryID
      t.string :Title
      t.string :Description
      t.boolean :Completed

      t.timestamps
    end
  end
end
