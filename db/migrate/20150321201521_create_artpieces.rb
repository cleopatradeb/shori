class CreateArtpieces < ActiveRecord::Migration
  def change
    create_table :artpieces do |t|
      t.string :name
      t.integer :user_id
      t.integer :artform_id
      t.text :description
      t.integer :height
      t.integer :width
      t.integer :depth
      t.integer :circumference, default: nil
      t.integer :price
      t.boolean :insurance
      t.string :image
      t.timestamps null: false
    end
  end
end

