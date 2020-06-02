### `www/api`
The core of the server, homemade PHP code that serves both games. For a URL, the game does a preflight request to `/resources` (the `lbpk` or `mdnr` folder, depending on the User-Agent HTTP header) only once, then does the real URL to this folder when it feel like it.

The filenames are based on the names of the XML files it gets from `/resources` (`lbpk`, `mdnr`), the URLs are set on the `url` attribute on the `request` element in a XML file, additionally they also act as a schema on how the request and responses should be.
