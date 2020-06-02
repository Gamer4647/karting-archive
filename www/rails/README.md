### `www/rails`
An archive folder of the source code that was used for the original servers of the games. The majority of these were obtained by crawling through URLs to see if they existed on the server, looked to see if they were comparable to any source publicly available (Google, GitHub, etc…), then sited the source in `SOURCES.csv`. The reason for citation is to prove that they are *not* part of any intellectual property and that it was already available under the MIT license to begin with. Files that *are* part of intellectual property **are and should not be** in this folder (but listed in `./.gitignore` until we can figure out what to do with them).

The original source code was made with **Ruby on Rails** (RoR) 0.8.0 as revealed by any of the `dispatch` files that was present on the server with no protection at all. However, the server appeared to be running a newer version of RoR that's above 3.0.19 because bugs that should be present on 0.8.0 were patched.

---

* `www/rails/app` — This is the app folder we wish we had. It is quite empty as you can see.

* `www/rails/public` — Files obtained through URL crawling. Anything outside of the `public` folder is a guess based on the sources — nothing could be obtained outside of that folder from the server. Believe us, we tried everything we can possibly do.

* `www/rails/SOURCES.csv` — A CSV file listing the linked source(s) to a filename in this folder. AKA, the "don't sue me, it's fair game" file.
