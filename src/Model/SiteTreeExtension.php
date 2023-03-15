<?php

namespace Innoweb\MetaCounter\Model;

use SilverStripe\Core\Config\Config;
use SilverStripe\Forms\FieldList;

class SiteTreeExtension extends \SilverStripe\CMS\Model\SiteTreeExtension {

    public function updateCMSFields(FieldList $fields)
    {
        $field = $fields->dataFieldByName('MetaTitle');
        if ($field) {
            $length = Config::inst()->get(SiteTreeExtension::class, 'meta_title_length');
            $lengthExtended = Config::inst()->get(SiteTreeExtension::class, 'meta_title_length_extended');
            if ($length && $length > 0) {
                $field->setAttribute('data-length', $length);
                if ($lengthExtended && $lengthExtended > 0 && $lengthExtended != $length) {
                    $field->setAttribute('data-length-extended', $lengthExtended);
                }
				$field->addExtraClass('js-meta-counter');
            }
        }

        $field = $fields->dataFieldByName('MetaDescription');
        if ($field) {
            $length = Config::inst()->get(SiteTreeExtension::class, 'meta_description_length');
            $lengthExtended = Config::inst()->get(SiteTreeExtension::class, 'meta_description_length_extended');
            if ($length && $length > 0) {
                $field->setAttribute('data-length', $length);
                if ($lengthExtended && $lengthExtended > 0 && $lengthExtended != $length) {
                    $field->setAttribute('data-length-extended', $lengthExtended);
                }
				$field->addExtraClass('js-meta-counter');
            }
        }

        return $fields;
    }
}
