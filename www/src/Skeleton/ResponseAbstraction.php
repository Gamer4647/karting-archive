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
 * Response Abstraction — Outlines the static class' functions
 * Allows the writing of COOKIE values as validated types.
 * @package Karting\Skeleton
 */
abstract class ResponseAbstraction {

    /**
     * Sets the specified COOKIE variable validated as a STRING type.
     *
     * @param string|int $key (name) of the variable.
     * @param string $value of the variable.
     * @return NULL when successful.
     **/
    abstract public static function COOKIE_String(string $key, string $value);

    /**
     * Sets the specified COOKIE variable validated as a INT type.
     *
     * @param string|int $key (name) of the variable.
     * @param int $value of the variable.
     * @return NULL when successful.
     **/
    abstract public static function COOKIE_Number(string $key, int $value);

    /**
     * Sets the specified COOKIE variable validated as a FLOAT type.
     *
     * @param string|int $key (name) of the variable.
     * @param float $value of the variable.
     * @return NULL when successful.
     **/
    abstract public static function COOKIE_Float(string $key, float $value);

    /**
     * Sets the specified COOKIE variable validated as a BOOLEAN type.
     *
     * @param string|int $key (name) of the variable.
     * @param boolean $value of the variable.
     * @return NULL when successful.
     **/
    abstract public static function COOKIE_Boolean(string $key, bool $value);

    /**
     * Sets the specified COOKIE variable validated as a IPv4/6 address.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @param string $value of the variable.
     * @return NULL when successful.
     **/
    abstract public static function COOKIE_IP4(string $key, string $value);

    /**
     * Sets the specified COOKIE variable encoded as Base64 of any type.
     *
     * @param string|int $key (name) of the variable.
     * @param string $value of the variable.
     * @return NULL when successful.
     **/
    abstract public static function COOKIE_Base64(string $key, string $value);
}
