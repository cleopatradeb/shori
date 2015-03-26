class AddPactIdToPactsUsers < ActiveRecord::Migration
  def change
    add_column :pacts_users, :pact_id, :integer
  end
end
