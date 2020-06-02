<?php
/* The game already has the file downloaded locally, just
   refer to it by its eTag then 304 Modified Status code */
header('ETag: "6e816c0a4113f7f1c46100385b3319fa"', true, 304);
