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
require_once(__DIR__ . '/../../index.php');
use Karting\Skeleton\Request;
use Karting\Skeleton\Response;
$Response->startElement('result');
    $Response->startElement('status');
        $Response->writeElement('id', SUCCESSFUL_RESPONSE_CODE);
        $Response->writeElement('message', SUCCESSFUL_COMPLETION);
    $Response->endElement();
    $Response->startElement('response');
        $Response->startElement('activities');
            $Response->writeAttribute('total', 0);
            $Response->writeAttribute('row_start', 0);
            $Response->writeAttribute('row_end', 0);
            $Response->writeAttribute('page', 1);
            $Response->writeAttribute('total_pages', 0);
            $Response->startElement('events');
                $Response->startElement('event');
                    $Response->writeAttribute('topic', 'system_event');
                    $Response->writeAttribute('type', 'announcement');
                    $Response->writeAttribute('details', "Congratulations on getting the keys to your very own Kart! We certainly hope you'll enjoy your time cruising the streets of the Imagisphere - perhaps even leaning to the side like you're really from the Sack 'hood. Before you get too caught up in being cool, remember to check out the fruits of your fellow Creators' labor in Community, where you can take the wheel in some truly wild and imaginative events.");
                    $Response->writeAttribute('creator_username', '');
                    $Response->writeAttribute('creator_id', 3390271);
                    $Response->writeAttribute('timestamp', '2012-11-04T17:49:20+00:00');
                    $Response->writeAttribute('seconds_ago', 173326102);
                    $Response->writeAttribute('tags', '');
                    $Response->writeAttribute('subject', 'Welcome!');
                    $Response->writeAttribute('image_url', '');
                    $Response->writeAttribute('image_md5', '');
                $Response->endElement();
            $Response->endElement();
        $Response->endElement();
    $Response->endElement();
$Response->endElement();
$Response->endDocument();
