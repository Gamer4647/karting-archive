<?php
/* The game already has the file downloaded locally, just
   refer to it by its eTag then 304 Modified Status code */
header('ETag: "a7b49e2e744aa238486b9af469eeabee"', true, 304);
