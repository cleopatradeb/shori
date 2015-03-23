class ChangeContactNumberInUser < ActiveRecord::Migration
  def change
    change_column(:users, :contact_number, :bigint)
  end
end
