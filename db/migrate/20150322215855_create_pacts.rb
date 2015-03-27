class CreatePacts < ActiveRecord::Migration
  def change
    create_table :pacts do |t|
      t.integer :venue_id
      t.integer :artist_id
      t.date :start_date
      t.date :end_date
      t.integer :revenue, default: nil

      t.timestamps null: false
    end
  end
end
