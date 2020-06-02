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
$Response->startElement('result');
    $Response->startElement('status');
        $Response->writeElement('id', SUCCESSFUL_RESPONSE_CODE);
        $Response->writeElement('message', SUCCESSFUL_COMPLETION);
    $Response->endElement();
    $Response->startElement('response');
        $Response->startElement('announcements');
            $Response->writeAttribute('total', 2);
            $Response->setIndent(false);
            $Response->startElement('announcement');
                $Response->writeAttribute('id', 3);
                $Response->writeAttribute('subject', 'Server Blessed (ilovesony)');
                $Response->writeAttribute('language_code', Request::Cookie_String('language_code'));
                $Response->writeAttribute('created_at', '2019-03-22T00:46:32-03:00');
                $Response->writeAttribute('modified_at', '2019-03-22T06:59:11-03:00');
                $Response->text("As thy ass's been blessed by hackers, you can now play the game online again~ Thanks Sony.");
            $Response->endElement();
            /*$Response->startElement('announcement');
                $Response->writeAttribute('id', 2);
                $Response->writeAttribute('subject', 'Server Decommission');
                $Response->writeAttribute('language_code', Request::Cookie_String('language_code'));
                $Response->writeAttribute('created_at', '2018-05-21T23:31:49+00:00');
                $Response->writeAttribute('modified_at', '2018-05-21T23:31:49+00:00');
                $Response->text('As you have to be online to play this title, you will not be able to play the game at all after October 10, 2018.');
            $Response->endElement();*/
            $Response->startElement('announcement');
                $Response->writeAttribute('id', 1);
                $Response->writeAttribute('subject', 'Server Maintenance');
                $Response->writeAttribute('language_code', Request::Cookie_String('language_code'));
                $Response->writeAttribute('created_at', '2010-05-14T00:52:24+00:00');
                $Response->writeAttribute('modified_at', '2010-05-14T00:52:24+00:00');
                $Response->text('Thank you for continuing to play ModNation.');
            $Response->endElement();
            $Response->setIndent(true);
            $Response->writeRaw("\n        ");
        $Response->endElement();
    $Response->endElement();
$Response->endElement();
$Response->endDocument();
