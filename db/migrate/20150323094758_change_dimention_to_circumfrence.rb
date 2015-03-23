class ChangeDimentionToCircumfrence < ActiveRecord::Migration
  def change
    rename_column(:artpieces, :dimension, :circumfrence)
  end
end
