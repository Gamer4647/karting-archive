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
session_start();
error_reporting(-1);
$_ROOT = $_SERVER['DOCUMENT_ROOT'];

$stage_mode = file_get_contents("$_ROOT/etc/stage_mode.json", false);
$stage_mode = json_decode($stage_mode, true, 4, JSON_THROW_ON_ERROR);
$stage_mode = (string)$stage_mode['data']['stage_mode'];

require_once "$_ROOT/src/__Default/Configurations/$stage_mode.php";
require_once "$_ROOT/src/Skeleton/CookiesAbstraction.php";
require_once "$_ROOT/src/Skeleton/CookiesImplementation.php";
require_once "$_ROOT/src/Skeleton/RequestAbstraction.php";
require_once "$_ROOT/src/Skeleton/RequestImplementation.php";
require_once "$_ROOT/src/Skeleton/ResponseAbstraction.php";
require_once "$_ROOT/src/Skeleton/ResponseImplementation.php";
require_once "$_ROOT/src/Utilities/PaginationAbstraction.php";
require_once "$_ROOT/src/Utilities/PaginationImplementation.php";

use Karting\Skeleton\Response;

use Karting\Skeleton\Cookies;

$language_codes = 'd[ae]|en-(gb|us)|es(-mx)?|f[ir]|it|ja|ko|n[lo]|p(l|t(-br)?)|ru|sv|zh-(cn|tw)';
if (is_null(Cookies::Get('preferences_updated'))) {
    Response::Cookie_Boolean('preferences_updated', false);
    Response::Cookie_String('language_code', LANGUAGE_CODE);
    Response::Cookie_Number('timezone', CLIENT_TIMEZONE);
    Response::Cookie_String('region_code', REGION_CODE);
    Response::Cookie_String('domain', COOKIE_DOMAIN);
    Response::Cookie_IP4('ip_address', IP_ADDRESS);
    Response::Cookie_Boolean('policy_accepted', false);
}
header('Content-Type: application/xml');
$Response = new XMLWriter();
$Response->openURI('php://output');
$Response->startDocument('1.0', 'UTF-8');
$Response->setIndentString('    ');
$Response->setIndent(true);
