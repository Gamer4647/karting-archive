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
abstract class Policies {
    const BPAED_FOR_MDNR_PS2 = 0;
    const BPAED_FOR_MDNR_PS3 = 1;
    const BPAED_FOR_MDNR_WEB = 2;
    const BPAED_FOR_MDNR_PSP = 35;
    const BPAED_FOR_MDNR_PSV = 0;
    const BPAED_FOR_LBPK_PS3 = 21;
}
$Response->startElement('result');
    $Response->startElement('status');
        $Response->writeElement('id', SUCCESSFUL_RESPONSE_CODE);
        $Response->writeElement('message', SUCCESSFUL_COMPLETION);
    $Response->endElement();
    $Response->startElement('response');
    $Response->startElement('policy');
    $Response->writeAttribute('name', 'Beta Participation Agreement');
    $Response->writeAttribute('id', Policies::BPAED_FOR_MDNR_PS3);
    $Response->writeAttribute('is_accepted', true);
        $Response->text(NULL);
    $Response->endElement();
    $Response->endElement();
$Response->endElement();
$Response->endDocument();
