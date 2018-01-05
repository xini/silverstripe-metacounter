# SilverStripe Metadata Limit Counter

[![Version](http://img.shields.io/packagist/v/xini/silverstripe-metacounter.svg?style=flat-square)](https://packagist.org/packages/xini/silverstripe-metacounter)
[![License](http://img.shields.io/packagist/l/xini/silverstripe-metacounter.svg?style=flat-square)](license.md)

## Overview

Adds limit counters to the meta title and description fields in the CMS. 

Two levels of limits can be configured to allow longer texts for certain search engines (i.e. Google).

## Requirements

* SilverStripe CMS ~3.1

## Installation

Install the module using composer:
```
composer require xini/silverstripe-metacounter dev-master
```
or download or git clone the module into a ‘metacounter’ directory in your webroot.

Then run dev/build.

## Configuration

The default limits are as follows and can be overridden in your site's config.yml:

```
MetaCounterSiteTreeExtension:
  meta_title_length: 55
  meta_title_length_extended: 55
  meta_description_length: 160
  meta_description_length_extended: 300
```

Once the text exceeds the configured 'length' of a field the counter will turn orange, once it exceeds 'length_extended' it will turn red and count backwards.

If 'length_extended' is not configured or if it is the same as 'length', the counter will turn red if the text exceeds 'length'.

## License

BSD 3-Clause License, see [License](license.md)
