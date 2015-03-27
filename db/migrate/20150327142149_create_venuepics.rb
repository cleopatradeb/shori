class CreateVenuepics < ActiveRecord::Migration
  def change
    create_table :venuepics do |t|
      t.string :url
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
