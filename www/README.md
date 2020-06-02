## `www`
This is what the server's public directory consists of. It is shared between LBPK (LittleBigPlanet™Karting) and MDNR (ModNation®Racers) due to how very similar the games are in terms of how they function and do networking.

---

* `www/api` — The core of the server, homemade PHP code that serves both games. For a URL, the game does a preflight request to `/resources` (the `lbpk` or `mdnr` folder, depending on the User-Agent HTTP header) only once, then does the real URL to this folder when it feel like it…
* `www/app` — What is shared between the code in `api`, common functions, static constants, SQL database credentials, Facebook family pictures, meows, etc.
* `www/lbpk` — The resources folder for LBPK, just schemas the game requests so it knows the URL, request method, the params, and the result it expects it should get back.
* `www/mdnr` — The resources folder for MDNR, just schemas the game requests so it knows the URL, request method, the params, and the result it expects it should get back.
* `www/rails` — An archive folder of the source code that was used for the original servers of the games. The majority of these were obtained by crawling through URLs to see if they existed on the server, looked to see if they were comparable to any source publicly available (Google, GitHub, etc…), then sited the source in `SOURCES.csv`. The reason for citation is to prove that they are *not* part of any intellectual property and that it was already available under the MIT license to begin with. Files that *are* part of intellectual property **are and should not be** in this folder (but listed in `./.gitignore` until we can figure out what to do with them)…
