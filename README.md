Native Ads: How do users react?
===============================

Notes from Meeting (10/26)
* (yahoo news references)
    - Square banner top right 
    - Look as similar to yahoo as possible.
    - Add noise (Dead links) to right side.
        + Stocks
        + Comics
        + Weather
    - Stream will have
        + One featured article.
        + Five smaller articles.
            * Second position is experimental article.
    - Right column
        + Right banner ad
        + weather comic
        + stock
* Variant A - Banner on the right side.



## TODO

* Short Term
    - Take out ... 
        + Tags
        + Footer
        + Featured Video
        + Flikr
        + Demo Page
        + top right / wide banner.
    - Change ...
        + Meta Title
        + Title / Subtitle.
        + Popular Posts
        + Reduce article height (make them fit on one page)
        + Make the two 125x125 ads on the right one larger ad.
        + Stop the carousel ...
    - Add ...
        + Category Banner
        + Add noise (Dead links) to right side.
            * Stocks
            * Comics
            * Weather
        + Make a native ad css style
    - Get 30 Articles
    - Anticipate 6 Brands
 * Long Term
    - Create Multiple Layout Schemes
    - Get the style specs from Yahoo news.


## Notes
* The only links that send you elsewhere should be:
    - the articles
    - the banner / native ads

```
Suppose, as you describe, you use Yahoo as the "template," here is how it would have to be different:
* the only content you need to replace would be (when applicable) the right banner ad and native ads (small and large versions).
* most of the links around the page we want to simply want to be dead links (so they click, but don't go anywhere). So even the widgets on the right side (weather, stocks, etc.) would be dead links not sending people elsewhere.
* the only links that send you elsewhere should be:
 -- the articles
 -- the banner / native ads
* we will limit the number of articles, scrolling will be limited to "one additional page lengths"
* for the native ad conditions, will have the native ad appear above the fold
```