class Pact < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :artpieces

  # validations
  validate :start_date, :validates_start_date
  validate :end_date, :validates_end_date_after_start_date

  def validates_start_date
    if start_date < Date.today
    end 
  end

  def validates_end_date_after_start_date
    if end_date < start_date
    end
  end
end
