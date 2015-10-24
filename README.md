Native Ads: How do users react?
===============================

* the only links that send you elsewhere should be:
    - the articles
    - the banner / native ads


The firebase account is up and logs when pages are clicked. Currently, I'm using a timer and a randomly generated unique identifier (UUIDv4) to organize the logs. 

When a new 'experiment' is started, the timer runs for some time, associating all activity (links clicked / time spent on each page) during that time period with one ID.

This is suitable in the short term. If ya'll want a different approach, or have any specific requests, lemme know.


Things that happen on new page load
* Get the info for the current experiment.
* Log page & time
* Send that info to the server.


## TODO

* Short Term
    - Create page to start experiment.
    - 
 * Long Term
    - Create Multiple Layout Schemes


## Notes

* Functions
    - `monitor` class
        + Creates a timer on startup.
        + Recieves a token identifying user, relating all activity it observes to that user.
        + When user leaves a page, `monitor` logs the information onto firebase.


---
* What should I do with small content?
    - Items
        + Social buttons.
        + Video thumbnail.
        + catagories at the top?
    - Removing all the clutter makes the page look unrealistic, but enabling all the content will cause unnecessary(?) complexity.
* What can Firebase help us track?
    - Trivial
        + Time on page.
        + Links clicked during session.
    - Non-Trivial
        + Mouse movement.
            * What time interval should be used to to flush client side buffer to FB server?
* What's the best way to track user information using the Firebase API?
    - A token system?
        + How will that information carry with the user as they navigate the web site?
    - On any hyperlink click, create a session id to pass into URL args. Use that id to associate behavior across pages.

---

* One __alternative to creating a dummy website__ is actually tracking user behavior on a live website.
    - Use a plugin that blocks real ad content and replaces it with our controlled content.
    - Could easily work for both native and banner ads.
    - Trivial
        + Blocking ads and loading our own controlled ones.
    - Non-Trivial
        + Locating ad content on any page in the yahoo domain.
        + Restricting user browsing so they can't leave the page without breaking the illusion of a live webiste.
            * _Is this really an issue?_

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