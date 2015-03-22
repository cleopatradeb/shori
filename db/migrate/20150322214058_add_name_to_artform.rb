class AddNameToArtform < ActiveRecord::Migration
  def change
    add_column :artforms, :name, :string
  end
end
