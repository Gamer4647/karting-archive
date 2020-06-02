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
$_BASE = 'admin';
$_ROOT = $_SERVER['DOCUMENT_ROOT'];
$_PROJECT = "$_ROOT/$_BASE";

use JsPhpize\JsPhpizePhug;
use ParagonIE\CSPBuilder\CSPBuilder;

require_once __DIR__ . '/vendor/autoload.php';

$whoops = new \Whoops\Run;
$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler)->register();
$stage_mode = file_get_contents("$_ROOT/etc/stage_mode.json", false);
$stage_mode = json_decode($stage_mode, true, 4, JSON_THROW_ON_ERROR);
$stage_mode = (string)$stage_mode['data']['stage_mode'];
$debug_enabled = is_bool(strpos($stage_mode, 'Production'));
$ssl_enabled = (
    $_SERVER['REQUEST_SCHEME'] === 'https' or (
        !empty($_SERVER['HTTPS']) and $_SERVER['HTTPS'] !== 'off'
    ) or (
        !empty($_SERVER['HTTP_X_FORWARDED_PROTO']) and
        $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https'
    )
) ? true : false;
$css_sha384_hash = base64_encode(
    hash('sha384', file_get_contents("$_PROJECT/src/application.css"), true)
);
$js_sha384_hash = base64_encode(
    hash('sha384', file_get_contents("$_PROJECT/src/application.js"), true)
);
$csp = CSPBuilder::fromFile("$_ROOT/etc/csp_policy.json");
$csp->disableOldBrowserSupport()
    ->addDirective('upgrade-insecure-requests', $ssl_enabled)
    ->sendCSPHeader();
header_remove('X-Webkit-CSP');
header_remove('X-Content-Security-Policy');
Phug::addExtension(JsPhpizePhug::class);
$phug_php_options = [
    'pugjs' => false,
    'debug' => false,
    'cache_dir' => '.pug',
    'upToDateCheck' => false,
    'basedir' => 'src',
    'paths' => ['src'],
    'shared_variables' => [
        'base' => "/$_BASE",
        'hashed' => [
            'css' => "sha384-$css_sha384_hash",
            'js' => "sha384-$js_sha384_hash"
        ],
        'config' => [
            'debug_enabled' => $debug_enabled,
            'ssl_enabled' => $ssl_enabled
        ]
    ]
];
#if (!$debug_enabled)
    #$phug_php_options['cache_dir'] = null;
$pug = new Pug($phug_php_options);
$pug->displayFile('application.pug');
