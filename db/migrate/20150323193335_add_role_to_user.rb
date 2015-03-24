class AddRoleToUser < ActiveRecord::Migration
  def change
    add_column :users, :role, :string
    add_column :users, :venue_name, :string
    add_column :users, :venue_facebook, :string
    add_column :users, :venue_image, :string   
    add_column :artpieces, :image, :string   
  end
end
