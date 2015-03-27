class AddFirstNameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :address, :string
    add_column :users, :postcode, :string
    add_column :users, :contact_number, :bigint
    add_column :users, :website, :string
    add_column :users, :verified, :boolean, default: false
    add_column :users, :biography, :text, default: nil
    add_column :users, :role, :string
    add_column :users, :venue_name, :string
    add_column :users, :social_media, :string, default: nil
  end
end
