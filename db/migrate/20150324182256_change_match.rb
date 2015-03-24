class ChangeMatch < ActiveRecord::Migration
  def change
    rename_table :matches, :followers
  end 
end
