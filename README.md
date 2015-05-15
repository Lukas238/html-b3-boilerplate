# html-b3sass-grid-boilerplate
HTML boilerplate with Bootstrap3-Sass Grid mixins and Gulp.

This webpage boilerplate use the CDN online Bootstrap3 library, but I included the **bootstrap-sass-official** library as well.

I added the grid mixins to the main **src\scss\styles.scss** file, so we can apply any grid to the semantic content from the CSS file only.


##Bootstrap 3 Grid Mixins
This are some of the more common grid mixins available in B3 for the grid

See the [complete list of grid mixins here](https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/bootstrap/mixins/_grid.scss).

###Container-fluid:
```sass
  // Centered container element
  @mixin container-fixed($gutter: $grid-gutter-width) {
    margin-right: auto;
    margin-left: auto;
    padding-left:  ($gutter / 2);
    padding-right: ($gutter / 2);
    @include clearfix;
  }
```
#####How to use:
```css
  section{
    @include container-fixed;
  }
```

###Row
```sass
  // Creates a wrapper for a series of columns
  @mixin make-row($gutter: $grid-gutter-width) {
    margin-left:  ($gutter / -2);
    margin-right: ($gutter / -2);
    @include clearfix;
  }
```
#####How to use:
```css
  section > .list{
    @include make-row;
  }
```

###Column SM
```sass
  // Generate the small columns
  @mixin make-sm-column($columns, $gutter: $grid-gutter-width) {
    position: relative;
    min-height: 1px;
    padding-left:  ($gutter / 2);
    padding-right: ($gutter / 2);
  
    @media (min-width: $screen-sm-min) {
      float: left;
      width: percentage(($columns / $grid-columns));
    }
  }
```
#####How to use:
This will render 3 columns (of 4 grid columns each, 4*3=12).
```css
section .list article{
  @include make-sm-column(4);
}
```






