<?php

class MetaCounterSiteTreeExtension extends SiteTreeExtension
{
    
    public function updateCMSFields(FieldList $fields)
    {
        $field = $fields->dataFieldByName('MetaTitle');
        if ($field) {
            $length = Config::inst()->get('MetaCounterSiteTreeExtension', 'meta_title_length');
            $lengthExtended = Config::inst()->get('MetaCounterSiteTreeExtension', 'meta_title_length_extended');
            if ($length && $length > 0) {
                $field->setAttribute('data-length', $length);
                if ($lengthExtended && $lengthExtended > 0 && $lengthExtended != $length) {
                    $field->setAttribute('data-length-extended', $lengthExtended);
                }
            }
        }
        
        $field = $fields->dataFieldByName('MetaDescription');
        if ($field) {
            $length = Config::inst()->get('MetaCounterSiteTreeExtension', 'meta_description_length');
            $lengthExtended = Config::inst()->get('MetaCounterSiteTreeExtension', 'meta_description_length_extended');
            if ($length && $length > 0) {
                $field->setAttribute('data-length', $length);
                if ($lengthExtended && $lengthExtended > 0 && $lengthExtended != $length) {
                    $field->setAttribute('data-length-extended', $lengthExtended);
                }
            }
        }
        
        return $fields;
    }
}
