<?php
class MetaCounterCMSExtension extends LeftAndMainExtension
{

    public function init()
    {
        parent::init();

        Requirements::css($this->ModuleBase() . '/css/metacounter.css');

        Requirements::javascript($this->ModuleBase() . '/javascript/metacounter.js');
    }

    private function ModuleBase()
    {
        return basename(dirname(dirname(__FILE__)));
    }
}
