# ISISDetect

* **Server:**

Server which accepts an array of texts and will return a list of predicition scores for if tweet is sympathetic to ISIS.

* **Twitter Scrapper to CSV:**

Scrapes twitter for 100 tweets, gets scores from server, and saves to CSV. 
When run again for the same search term last tweet queried will be remembered to avoid duplicates.

To be run via cron-job, _e.g. scrape every 5 minutes_.

* **Chrome Extension:**

Chrome extension provides interactive view overlayed over twitter. Send score requests for each tweet on a page. 
Also can report false positives/negatives via an extra action button inserted on twitter.
