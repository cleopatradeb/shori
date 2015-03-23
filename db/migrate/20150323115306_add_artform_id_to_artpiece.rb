class AddArtformIdToArtpiece < ActiveRecord::Migration
  def change
    add_column :artpieces, :artform_id, :integer
  end
end
