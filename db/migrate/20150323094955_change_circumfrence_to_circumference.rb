class ChangeCircumfrenceToCircumference < ActiveRecord::Migration
  def change
    rename_column(:artpieces, :circumfrence, :circumference)
  end
end
