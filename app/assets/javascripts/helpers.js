// TRUSTED AWS LINK FILTER
app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);

// CUSTOM FILTERS
app.filter('browseFilter', function() {
  return function(allitems, checked) {
    console.log(allitems)
    if (checked.all === true) {
      return allitems
    }
    if (checked.artist === true) {
      var artists = _.filter(allitems, function(user){return user.role === 'artist'})
      return artists;
    }
    if (checked.venue === true) {
      var venues = _.filter(allitems, function(user){return user.role === 'venue'})
      return venues;
    }
    if (checked.painting === true) {
      console.log('searching paintings');
      var paintings = _.filter(allitems, function(art){return art.artform.name === 'Illustration and Painting'})
      return paintings;
    }
    if (checked.photography === true) {
      console.log('searching photo');
      var photographs = _.filter(allitems, function(art){return art.artform.name === 'Photography'})
      return photographs;
    }
    if (checked.craft === true) {
      console.log('searching crafts');
      var crafts = _.filter(allitems, function(art){return art.artform.name === 'Craft'})
      return crafts;
    }
  }
})

// MOMENT
function LastWeekStart() {
  lastMonday = moment().subtract(1, 'weeks').startOf('isoWeek');
  return lastMonday;
}

