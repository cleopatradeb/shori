class CreatePactsUsers < ActiveRecord::Migration
  def change
    create_table :pacts_users do |t|
      t.integer :artist_id
      t.integer :venue_id
      t.timestamps null: false
    end
  end
end
