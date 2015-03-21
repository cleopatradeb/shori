class CreateArtforms < ActiveRecord::Migration
  def change
    create_table :artforms do |t|

      t.timestamps null: false
    end
  end
end
