class AddUserIdToPacts < ActiveRecord::Migration
  def change
    add_column :pacts, :user_id, :integer
  end
end
