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
namespace Karting\Skeleton;

/**
 * Cookies Implementation — Implementation of CookiesMarshaller
 * Functions to allow the reading and writing of SESSION variables.
 * @package Karting\Skeleton
 */
class Cookies extends CookiesAbstraction {

    /**
     * Gets the specified COOKIE variable by cookie name.
     * Returns NULL when the cookie doesn't exist.
     *
     * @param string|int $key (name) of the variable.
     * @return mixed Returns the matching variable.
     **/
    public static function Get(string $key) {
        return isset($_SESSION[$key])? $_SESSION[$key]: NULL;
    }

    /**
     * Sets a new COOKIE variable by cookie name and value.
     *
     * @param string|int $key (name) of the variable.
     * @param string|int $value of the variable.
     * @return NULL when successful.
     **/
    public static function Set(string $key, $value) {
        $_SESSION[$key] = $value;
        return NULL;
    }
}
