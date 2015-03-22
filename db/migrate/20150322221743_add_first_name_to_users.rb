class AddFirstNameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :address, :string
    add_column :users, :postcode, :string
    add_column :users, :contact_number, :integer
    add_column :users, :links, :string
    add_column :users, :verified, :boolean
    add_column :users, :bioraphy, :text
  end
end
