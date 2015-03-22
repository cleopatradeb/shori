class AddFieldsToPact < ActiveRecord::Migration
  def change
    add_column :pacts, :venue_id, :integer
    add_column :pacts, :artist_id, :integer
    add_column :pacts, :start_date, :date
    add_column :pacts, :end_date, :date
  end
end
