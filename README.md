# Shori
#####[Shori (Demo) https://shori.herokuapp.com](https://shori.herokuapp.com)
> *Bringing together venues and budding artists. A win-win situation.*
> Shori is Japanese for "win", pointing to the underlying philosophy of the app - to create a win-win situation: for budding artists looking to showcase their art, and venues looking for free decor and diversifying their products risk-free.

### Versions & Setup
This web app was tested on **Rails 4.2.0**, **PostgreSQL 9.4.0**, **Angular 1.3.15** and Chrome. 
To get started, clone the project using the SSH URL `git@github.com:natbatwat/shori.git`, run a `rake db:create db:migrate db:seed` and `bundle install`. 

### Dependencies 
The following libraries/ frameworks were used in the making of this project.
- Angular.js
- Underscore.js
- Moment.js
- Twitter Bootstrap
- jQuery

#### NOTE:

> This project is still in production but the following code snippets may come in handy for reference. I have categorized them via **main functionality** and **front-end highlights**. Please feel free to reference them! Tweet me [@natbatwat](http://www.twitter.com/natbatwat), or email me at  <a href="mailto:hi@natalieloh.com">hi@natalieloh.com</a> if you have any questions! 

> I plan to write tutorials on these topics soon. Check my blog [natalieloh.com/blog](http://natalieloh.com/blog) for updates.


## Key Functionality

#### 1. Angular Filtered Browse
> Filtering `Users` and `Artpieces` by user role type (artist, venue) and artpiece type (painting, illustration, craft). 

*Note: The browse tabs use Material.js. Refer below for the code for that bit.*

```javascript
#browse-controller.js

$scope.roleQuery = '';
$scope.artformQuery = '';
$scope.roletype = {artist:false, venue:false};
$scope.artform = {painting:false, photography:false, craft:false};
```

```html
# browse.html
<md-tabs md-selected="tabData.selectedIndex" class="browse-tags">
  <md-tab id="roletype-browse-tab">
    <md-tab-label>by Roletype</md-tab-label>
    <md-tab-template>
      <form class="search-form">
        <md-input-container id="search-all-input">
          <input type="text" name="all" ng-model="roleQuery" placeholder="a name, company, or artpiece" id="search-input">
        </md-input-container>
        <input type="checkbox" ng-model="roletype.artist">Artist
        <input type="checkbox" ng-model="roletype.venue">Venue
        <div ng-if="roletype.all || roletype.venue || roletype.artist">
          <div ng-repeat="user in usersArr| filter:{first_name:roleQuery} | browseFilter: roletype | orderBy: 'first_name'">
            <h4 ng-if="user.role === 'artist'"><a ng-href="users/{{ user.id }}">{{ user.first_name }} {{user.last_name}}</a></h4>
            <div ng-if="user.role === 'venue'"><h4><a ng-href="users/{{ user.id }}">{{ user.first_name }} {{user.last_name}} : {{ user.venue_name }}</a></h4></div>
          </div>
        </div>
      </form>
    </md-tab-template>
  </md-tab>
</md-tabs>
```

---

#### 2. Angular QR Code Generation
Inject the `monospaced.qrcode` Angular directive.
```html
# gallery.html
<div class="qrcode">
  <qrcode data="http://localhost:3000/shori/artpiece/{{selectedArtpiece.id}}" href="http://localhost:3000/shori/artpiece/{{selectedArtpiece.id}}" size='100'></qrcode>
</div>
```
---

#### 3. Seeding Data with AWS S3 and Faker Gem
Add to gemfile: `gem 'faker'`
Seeding data from AWS:
```ruby
# seeds.rb
20.times do |n|
  Venuepic.create(
    url: "https://s3-eu-west-1.amazonaws.com/path/path_to_bucket/image_#{n}.jpg",
    user_id: all_venues[n].id
  )
end
```
*NameChanger app available on the App Store for mass renaming of photos*
## Front-end Highlights 

#### 1. Masonry Gallery & `img-wit` Directive
Add `'angular-wurfl-image-tailor'` and `'wu.masonry'` Angular directives.

```html
# gallery.html
<div class="row-fluid">
  <div class="col col-lg-12">
    <div masonry class="gallery">
      <div class="masonry-brick gallery-item hvr-grow" ng-repeat="art in profileUserArtpieces">
        <img-wit ng-src="{{art.image | trusted}}" w="300"></img-wit>
        <div class="gallery-overlay" ng-href="/shori/artpiece/{{art.id}}">
          <div class="cl-effect-1">
            <p><a ng-href="/shori/artpiece/{{art.id}}" class="gallery-name">{{art.name}}</a></p>
          </div>
          <p class="gallery-status" ng-if="art.status === 'sold'">SOLD</p>
          <p><a ng-href="/shori/artpiece/{{art.id}}" id="gallery-text">{{art.description}}</a></p>
        </div>
      </div>
    </div>
  </div>
</div>
```
---

#### 2. Snap to Grid
```javascript
// Logo Scrolling
var logo = $('#logo');
var body = document.body;
var html = document.documentElement;
height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
$(window).scroll(function(){
  var offset = [$(document).scrollTop()/height] * [$(window).height()*1.3];
  var logoScroll = TweenLite.to(logo, 0.5, {top: offset});
  if($(document).scrollTop() > [$(window).height() + $(window).height()*0.2]){
    logoScroll.pause();
  }
})

// Scroll to Top
$('.scroll-to-top').click(function(){
  verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
  element = $('body');
  offset = element.offset();
  offsetTop = offset.top;
  $('html, body').animate({scrollTop: offsetTop}, 600, 'easeOutQuint');
})

// Changing logo color
var logo_to_black_inview = new  ({
  element: $('.icon-container'),
  enter: function(direction) {
    console.log('hi');
    $('#logo').animate({"color":"black", "background-color":"none", "border-color": "none"}, 1500);
  }
})

var logo_to_white_inview = new Waypoint.Inview({
  element: $('.icon-container')[0],
  exit: function(direction) {
    console.log('Exit triggered with direction ' + direction)
    $('#logo').animate({"color":"white", "background-color":"rgba(0,0,0,0.2)", "border": "1vh solid white"}, 1000);
  }
})

// Fade out arrow
var arrow_waypoint = new Waypoint({
  element: $('.landing-container'),
  handler: function(){
  $(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
      $('#arrow').fadeIn("slow");
    }
    else {
      $('#arrow').fadeOut("slow");
      $('.scroll-to-top').addClass("animated fadeInUpBig").removeClass('hide');
    }
  });
  }
})
```

## To Do
1. Write tests for both Rails and Angular code 
2. Optimize Angular code (reducing ng-repeats, use one-way binding where appropriate, and increasing efficiency of HTTP requests)