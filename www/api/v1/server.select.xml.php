<?php
/* WARNING: If you give a proper response back to the server (the server list
   signature, & tickets), then the game will attempt to do a HTTPS connection
   (regardless of the port) and kick the user out of the server with the
  "Lost connection to game server" message after 30 seconds. And no, we can't
  do SSL because the HTTPS certs have to be signed by Sony, aka — impossible.
 
  Easy hack: Make the request time out and the game won't kick the user. */
sleep(31);
