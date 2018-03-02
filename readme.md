# SilverStripe Metadata Limit Counter

[![Version](http://img.shields.io/packagist/v/innoweb/silverstripe-metacounter.svg?style=flat-square)](https://packagist.org/packages/innoweb/silverstripe-metacounter)
[![License](http://img.shields.io/packagist/l/innoweb/silverstripe-metacounter.svg?style=flat-square)](license.md)

## Overview

Adds limit counters to the meta title and description fields in the CMS. 

Two levels of limits can be configured to allow longer texts for certain search engines (i.e. Google).

## Requirements

* SilverStripe CMS 4.x

Note: this version is compatible with SilverStripe 4. For SilverStripe 3, please see the [1.1 release line](https://github.com/xini/silverstripe-metacounter/tree/1.1).

## Installation

Install the module using composer:
```
composer require innoweb/silverstripe-metacounter dev-master
```
or download or git clone the module into a ‘metacounter’ directory in your webroot.

Then run dev/build.

## Configuration

The default limits are as follows and can be overridden in your site's config.yml:

```
Innoweb\MetaCounter\Model\SiteTreeExtension:
  meta_title_length: 55
  meta_title_length_extended: 55
  meta_description_length: 160
  meta_description_length_extended: 300
```

Once the text exceeds the configured 'length' of a field the counter will turn orange, once it exceeds 'length_extended' it will turn red and count backwards.

If 'length_extended' is not configured or if it is the same as 'length', the counter will turn red if the text exceeds 'length'.

## Troubleshooting

Sometimes you may add a MetaTitle field to your Page sub/class, with correct length configurations, but no counter appears.

If you have added the field manually rather than via `kinglozzer/metatitle` sometimes the Page extension in this module will run before your MetaTitle field is present (and as result there is no field for the counter to attach to).

To protect against this, use `beforeUpdateCMSFields()` inside your `getCMSFields()`:

```
public function getCMSFields()
{
    $this->beforeUpdateCMSFields(function(FieldList $fields) {
        $fields->insertBefore(
            'MetaDescription',
            TextField::create('MetaTitle', $this->fieldLabel('MetaTitle'))
        ); 
    });
    
    $fields = parent::getCMSFields();
    // your other class-specific CMS fields setup
    return $fields;
}
```

## License

BSD 3-Clause License, see [License](license.md)
