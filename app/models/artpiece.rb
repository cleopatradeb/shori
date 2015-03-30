class Artpiece < ActiveRecord::Base
  belongs_to :user
  belongs_to :artform
  belongs_to :pact

  # validations
  validates_presence_of :name, :price, :width, :height, :description
  validates :price, numericality: { greater_than: 0 }
  validates :price, exclusion: { in: %w(£ ¢ $ €), message: "%{value} cannot be included" }

  dragonfly_accessor :qr_code
end
