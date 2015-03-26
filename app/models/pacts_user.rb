class PactsUser < ActiveRecord::Base
  belongs_to :pact
  belongs_to :user
end
