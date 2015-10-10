Native Ads: How do users react?
===============================


## TODO

* Short Term
    * Get familiar with existing template CSS
    * Use firebase to store session information.
 * Long Term
    * None yet


## Notes

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
