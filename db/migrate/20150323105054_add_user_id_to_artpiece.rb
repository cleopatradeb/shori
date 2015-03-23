class AddUserIdToArtpiece < ActiveRecord::Migration
  def change
    add_column :artpieces, :user_id, :integer
  end
end
