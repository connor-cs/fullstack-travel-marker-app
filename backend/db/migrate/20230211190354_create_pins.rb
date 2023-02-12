class CreatePins < ActiveRecord::Migration[7.0]
  def change
    create_table :pins do |t|
      t.string :username
      t.string :title
      t.string :desc
      t.integer :rating
      t.float :lat
      t.float :long

      t.timestamps
    end
  end
end
