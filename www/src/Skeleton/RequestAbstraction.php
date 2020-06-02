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
 * Request Abstraction — Outlines the static class' functions
 * Allows the reading of GET, POST, or COOKIE values as validated types.
 * @package Karting\Skeleton
 */
abstract class RequestAbstraction {

    /**
     * Gets the specified GET variable validated as a STRING type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return string Returns the matching variable.
     **/
    abstract public static function GET_String(string $key);

    /**
     * Gets the specified GET variable validated as a INT type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return int Returns the matching variable.
     **/
    abstract public static function GET_Number(string $key);

    /**
     * Gets the specified GET variable validated as a FLOAT type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return float Returns the matching variable.
     **/
    abstract public static function GET_Float(string $key);

    /**
     * Gets the specified GET variable validated as a BOOLEAN type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return boolean Returns the matching variable.
     **/
    abstract public static function GET_Boolean(string $key);

    /**
     * Gets the specified GET variable validated as a IPv4/6 address.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return string Returns the matching variable.
     **/
    abstract public static function GET_IP4(string $key);

    /**
     * Gets the specified GET variable decoded from Base64 of any type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return mixed Returns the matching variable.
     **/
    abstract public static function GET_Base64(string $key);

    /**
     * Gets the specified POST variable validated as a STRING type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return string Returns the matching variable.
     **/
    abstract public static function POST_String(string $key);

    /**
     * Gets the specified POST variable validated as a INT type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return int Returns the matching variable.
     **/
    abstract public static function POST_Number(string $key);

    /**
     * Gets the specified POST variable validated as a FLOAT type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return float Returns the matching variable.
     **/
    abstract public static function POST_Float(string $key);

    /**
     * Gets the specified POST variable validated as a BOOLEAN type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return boolean Returns the matching variable.
     **/
    abstract public static function POST_Boolean(string $key);

    /**
     * Gets the specified POST variable validated as a IPv4/6 address.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return string Returns the matching variable.
     **/
    abstract public static function POST_IP4(string $key);

    /**
     * Gets the specified POST variable decoded from Base64 of any type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return mixed Returns the matching variable.
     **/
    abstract public static function POST_Base64(string $key);

    /**
     * Gets the specified COOKIE variable validated as a STRING type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @uses Karting\Skeleton\Cookies::GET to get session variables.
     * @param string|int $key (name) of the variable.
     * @return string Returns the matching variable.
     **/
    abstract public static function COOKIE_String(string $key);

    /**
     * Gets the specified COOKIE variable validated as a INT type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @uses Karting\Skeleton\Cookies::GET to get session variables.
     * @param string|int $key (name) of the variable.
     * @return int Returns the matching variable.
     **/
    abstract public static function COOKIE_Number(string $key);

    /**
     * Gets the specified COOKIE variable validated as a FLOAT type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @uses Karting\Skeleton\Cookies::GET to get session variables.
     * @param string|int $key (name) of the variable.
     * @return float Returns the matching variable.
     **/
    abstract public static function COOKIE_Float(string $key);

    /**
     * Gets the specified COOKIE variable validated as a BOOLEAN type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @uses Karting\Skeleton\Cookies::GET to get session variables.
     * @param string|int $key (name) of the variable.
     * @return boolean Returns the matching variable.
     **/
    abstract public static function COOKIE_Boolean(string $key);

    /**
     * Gets the specified COOKIE variable validated as a IPv4/6 address.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @uses Karting\Skeleton\Cookies::GET to get session variables.
     * @param string|int $key (name) of the variable.
     * @return string Returns the matching variable.
     **/
    abstract public static function COOKIE_IP4(string $key);

    /**
     * Gets the specified COOKIE variable decoded from Base64 of any type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @uses Karting\Skeleton\Cookies::GET to get session variables.
     * @param string|int $key (name) of the variable.
     * @return mixed Returns the matching variable.
     **/
    abstract public static function COOKIE_Base64(string $key);
}
