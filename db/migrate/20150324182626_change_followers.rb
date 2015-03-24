class ChangeFollowers < ActiveRecord::Migration
  def change
      rename_table :followers, :following
      remove_column :following, :venue_id
      remove_column :following, :artist_id
  end
end
