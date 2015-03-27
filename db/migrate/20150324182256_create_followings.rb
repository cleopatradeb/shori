class CreateFollowings < ActiveRecord::Migration
  def change
    create_table :followings do |t|
      t.integer :venue_id
      t.integer :artist_id
      t.integer :follower_id
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
