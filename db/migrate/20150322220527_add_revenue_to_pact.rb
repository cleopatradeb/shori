class AddRevenueToPact < ActiveRecord::Migration
  def change
    add_column :pacts, :revenue, :integer
  end
end
