class CreateVenuepics < ActiveRecord::Migration
  def change
    create_table :venuepics do |t|
      t.string :url
      t.timestamps null: false
    end
  end
end
