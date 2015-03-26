// CUSTOM FILTERS
app.filter('roleFilter', function() {
  return function(allusers, checked) {
    console.log(checked);
    if ((checked.all) === true) {
      console.log('hello');
    }
    if (checked.artist === true) {
      var artists = _.filter(allusers, function(user){return user.role === 'artist'})
      return artists;
    }
    if (checked.venue === true) {
      var venues = _.filter(allusers, function(user){return user.role === 'venue'})
      return venues;
    }
  }
})

// MOMENT
function LastWeekStart() {
  lastMonday = moment().subtract(1, 'weeks').startOf('isoWeek');
  return lastMonday;
}

