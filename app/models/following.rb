class Following < ActiveRecord::Base
  belongs_to :user

  validates_uniqueness_of :user_id, :scope => :following_id
  validates_uniqueness_of :following_id, :scope => :user_id
  validate :cannot_follow_self

  private
  def cannot_follow_self
    errors.add(:following_id, 'You cannot follow yourself!') if following_id == user_id
  end

end
