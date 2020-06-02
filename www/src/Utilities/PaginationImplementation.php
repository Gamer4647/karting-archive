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
 * Pagination Implementation — Outlines the class' functions
 * To calculate the amount of pages and rows per page.
 * @package Karting\Utilities
 **/
class Pagination extends PagenationAbstraction {

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
    public function __construct(int $page, int $per_page, int $limit) {
        /* $per_page must be at least 1 otherwise '0' can DOS the server. */
        /* When writing to $this->… be sure to make it type of (string). */
        $page = min(max(0, $page), 1000);
        $per_page = min(max(1, $per_page), 50);
        $limit = min(max(0, $limit), 1000);
        $this->limit = (string)$limit;
        $this->selected = (string)$page;
        $pages = 0;
        $current = 1;
        $stickied = 0;
        $excess = $limit;
        while ((bool)$excess) {
            if ($excess >= $per_page) {
                $excess = $excess - $per_page;
                if ($page === $current)
                    $stickied = $per_page;
                $pages++; $current++;
            } else {
                if ($page === $current)
                    $stickied = $excess;
                $excess = 0; $pages++;
            }
        }
        if ($page > $pages) {
            $this->accumulated = '0';
            $this->stickied = '0';
        } else if ($page > 0) {
            /* Page must be within the valid range! */
            $this->accumulated = (string)(
                (($page - 1) * $per_page) + 1
            );
            $this->stickied = (string)(
                ($this->accumulated - 1) + $stickied
            );
        } else {
            $this->accumulated = '0';
            $this->stickied = '0';
        }
        $this->pages = (string)$pages;
    }
}
