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
namespace Karting\Utilities;

/**
 * Pagination Abstraction — Outlines the class' functions
 * To calculate the amount of pages and rows per page.
 * @package Karting\Utilities
 **/
abstract class PagenationAbstraction {

    /**
     * @var string $limit For use with attribute "total".
     * @var string $accumulated For use with attribute "row_start".
     * @var string $stickied For use with attribute "row_end".
     * @var string $page For use with attribute "page".
     * @var string $pages For use with attribute "total_pages".
     */
    public $limit, $accumulated, $stickied, $page, $pages;

    /**
     * @param int $page The current page.
     * @param int $per_page Limit the amount of rows per page.
     * @param int $limit The maxmimum amount of rows in total.
     **/
    abstract public function __construct(int $page, int $per_page, int $limit);
}
