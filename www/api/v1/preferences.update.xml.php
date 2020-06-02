<?php
/**
 * karting — An emulated game server for ModNation®Racers
 *           and LittleBigPlanet™Karting on the PS3®.
 *           © 2018-2019 Jonathan (“Jon”, @llnwn) and contributors…
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 **/ 
declare(strict_types = 1);
require_once(__DIR__ . '/../../index.php');
use Karting\Skeleton\Request;
use Karting\Skeleton\Response;
$language_code = LANGUAGE_CODE;
$timezone = CLIENT_TIMEZONE;
$region_code = REGION_CODE;
$domain = COOKIE_DOMAIN;
$ip_address = IP_ADDRESS;
if (!is_null(Request::POST_String('preferences[language_code]'))) {
    $language_code = Request::POST_String('preferences[language_code]');
    $language_code = preg_match("/^($language_codes)$/", $language_code)?
        $language_code: LANGUAGE_CODE;
}
if (!is_null(Request::POST_Float('preferences[timezone]'))) {
    $timezone = Request::POST_Float('preferences[timezone]');
    $timezone = round($timezone, 0, PHP_ROUND_HALF_UP);
    $timezone = preg_match('/^[-+]?[0-9]{1,4}$/', $timezone)?
        (float)$timezone: CLIENT_TIMEZONE;
}
if (!is_null(Request::POST_String('preferences[region_code]'))) {
    $region_code = Request::POST_String('preferences[region_code]');
    $region_code = preg_match('/^(scea|scee|sceasia|scej)$/', $region_code)?
        $region_code: REGION_CODE;
}
if (!is_null(Request::POST_String('preferences[domain]'))) {
    $domain = Request::POST_String('preferences[domain]');
}
if (!is_null(Request::POST_IP4('preferences[ip_address]'))) {
    $ip_address = Request::POST_IP4('preferences[ip_address]');
}
Response::Cookie_Boolean('preferences_updated', true);
Response::Cookie_String('language_code', $language_code);
Response::Cookie_Number('timezone', $timezone);
Response::Cookie_String('region_code', $region_code);
Response::Cookie_String('domain', $domain);
Response::Cookie_IP4('ip_address', $ip_address);
$Response->startElement('result');
    $Response->startElement('status');
        $Response->writeElement('id', SUCCESSFUL_RESPONSE_CODE);
        $Response->writeElement('message', SUCCESSFUL_COMPLETION);
    $Response->endElement();
    $Response->startElement('response');
        $Response->startElement('preferences');
        $Response->writeAttribute('language_code', $language_code);
        $Response->writeAttribute('timezone', $timezone);
        $Response->writeAttribute('region_code', $region_code);
        $Response->writeAttribute('domain', $domain);
        $Response->writeAttribute('ip_address', $ip_address);
        $Response->endElement();
    $Response->endElement();
$Response->endElement();
$Response->endDocument();
