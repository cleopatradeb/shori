// TRUSTED AWS LINK FILTER
app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

// CUSTOM FILTERS
app.filter('browseFilter', function() {
  return function(allusers, checked) {
    console.log(allusers)
    if (checked.all === true) {
      return allusers
    }
    if (checked.artist === true) {
      var artists = _.filter(allusers, function(user){return user.role === 'artist'})
      return artists;
    }
    if (checked.venue === true) {
      var venues = _.filter(allusers, function(user){return user.role === 'venue'})
      return venues;
    }
    if (checked.painting === true) {
      var paintings = _.filter(allusers, function(user){return user.role === 'venue'})
      return paintings;
    }
    if (checked.photography === true) {
      var photographs = _.filter(allusers, function(user){return user.role === 'venue'})
      return photographs;
    }
  }
})

// MOMENT
function LastWeekStart() {
  lastMonday = moment().subtract(1, 'weeks').startOf('isoWeek');
  return lastMonday;
}

