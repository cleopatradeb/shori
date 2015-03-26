class AddUserIdToPactsUsers < ActiveRecord::Migration
  def change
    add_column :pacts_users, :user_id, :integer
  end
end
