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

use Karting\Skeleton\Cookies;

/**
 * Response Implementation — Implementation of ResponseMarshaller
 * Allows the writing of COOKIE values as validated types.
 * @package Karting\Skeleton
 */
class Response extends ResponseAbstraction {

    /**
     * Sets the specified COOKIE variable validated as a STRING type.
     *
     * @param string|int $key (name) of the variable.
     * @param string $value of the variable.
     * @return NULL when successful.
     **/
    public static function COOKIE_String(string $key, string $value) {
        Cookies::Set($key, substr((string)$value, 0, 512));
        return NULL;
    }

    /**
     * Sets the specified COOKIE variable validated as a INT type.
     *
     * @param string|int $key (name) of the variable.
     * @param int $value of the variable.
     * @return NULL when successful.
     **/
    public static function COOKIE_Number(string $key, int $value) {
        Cookies::Set($key, (int)$value);
        return NULL;
    }

    /**
     * Sets the specified COOKIE variable validated as a FLOAT type.
     *
     * @param string|int $key (name) of the variable.
     * @param float $value of the variable.
     * @return NULL when successful.
     **/
    public static function COOKIE_Float(string $key, float $value) {
        Cookies::Set($key, (float)$value);
        return NULL;
    }

    /**
     * Sets the specified COOKIE variable validated as a BOOLEAN type.
     *
     * @param string|int $key (name) of the variable.
     * @param boolean $value of the variable.
     * @return NULL when successful.
     **/
    public static function COOKIE_Boolean(string $key, bool $value) {
        Cookies::Set($key, (boolean)$value);
        return NULL;
    }

    /**
     * Sets the specified COOKIE variable validated as a IPv4/6 address.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @param string $value of the variable.
     * @return NULL when successful.
     **/
    public static function COOKIE_IP4(string $key, string $value) {
        Cookies::Set($key, (string)$value);
        return NULL;
    }

    /**
     * Sets the specified COOKIE variable encoded as Base64 of any type.
     *
     * @param string|int $key (name) of the variable.
     * @param string $value of the variable.
     * @return NULL when successful.
     **/
    public static function COOKIE_Base64(string $key, string $value) {
        Cookies::Set($key, (string)base64_encode($value));
        return NULL;
    }
}
