class CreateArtpieces < ActiveRecord::Migration
  def change
    create_table :artpieces do |t|

      t.timestamps null: false
    end
  end
end
