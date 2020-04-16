# Parade domain access

A custom module providing feature to assign campaign sites (node) to domains based on domain access module and set domain frontpage if '/' domain path alias is set.

## Configuration

If you need manage (adding new) domains, you'll be needed to git ignore domain entities and site settings in your (local)settings.php:

## Features

* Hook insert/update to set domain front page for selected domain on '/' path alias.
