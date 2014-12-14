<?php

class MetaCounterSiteTreeExtension extends SiteTreeExtension {
	
	private static $meta_title_length = 55;
	private static $meta_description_length = 160;

	public function updateCMSFields(FieldList $fields) {
		
		$field = $fields->dataFieldByName('MetaTitle');
		if ($field) {
			$field->setAttribute('data-length', self::$meta_title_length);
		}
		
		$field = $fields->dataFieldByName('MetaDescription');
		if ($field) {
			$field->setAttribute('data-length', self::$meta_description_length);
		}
		
		return $fields;
	}

}