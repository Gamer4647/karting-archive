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
 * Request Implementation — Implementation of RequestMarshaller
 * Allows the reading of GET, POST, or COOKIE values as validated types.
 * @package Karting\Skeleton
 */
class Request extends RequestAbstraction {

    /**
     * Gets the specified GET variable validated as a STRING type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return string Returns the matching variable.
     **/
    public static function GET_String(string $key) {
        $scoped = $_GET;
        $keys = explode('[', str_replace(']', '', $key));
        $count = count($keys);
        for ($i = 0; $i <= $count - 2; $i++) {
            $k = $keys[$i];
            $scoped = !empty($scoped[$k]) &&
                is_array($scoped[$k])? $scoped[$k]: [];
        }
        $key = $keys[$count - 1];
        if (!empty($key) && isset($scoped[$key]))
            return substr((string)$scoped[$key], 0, 512);
        return NULL;
    }

    /**
     * Gets the specified GET variable validated as a INT type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return int Returns the matching variable.
     **/
    public static function GET_Number(string $key) {
        $scoped = $_GET;
        $keys = explode('[', str_replace(']', '', $key));
        $count = count($keys);
        for ($i = 0; $i <= $count - 2; $i++) {
            $k = $keys[$i];
            $scoped = !empty($scoped[$k]) &&
                is_array($scoped[$k])? $scoped[$k]: [];
        }
        $key = $keys[$count - 1];
        if (!empty($key) && isset($scoped[$key]) &&
                ctype_digit((string)$scoped[$key]))
            return (int)$scoped[$key];
        return NULL;
    }

    /**
     * Gets the specified GET variable validated as a FLOAT type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return float Returns the matching variable.
     **/
    public static function GET_Float(string $key) {
        $scoped = $_GET;
        $keys = explode('[', str_replace(']', '', $key));
        $count = count($keys);
        for ($i = 0; $i <= $count - 2; $i++) {
            $k = $keys[$i];
            $scoped = !empty($scoped[$k]) &&
                is_array($scoped[$k])? $scoped[$k]: [];
        }
        $key = $keys[$count - 1];
        if (!empty($key) && isset($scoped[$key]) &&
                is_numeric((string)$scoped[$key]))
            return (float)$scoped[$key];
        return NULL;
    }

    /**
     * Gets the specified GET variable validated as a BOOLEAN type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return boolean Returns the matching variable.
     **/
    public static function GET_Boolean(string $key) {
        $scoped = $_GET;
        $keys = explode('[', str_replace(']', '', $key));
        $count = count($keys);
        for ($i = 0; $i <= $count - 2; $i++) {
            $k = $keys[$i];
            $scoped = !empty($scoped[$k]) &&
                is_array($scoped[$k])? $scoped[$k]: [];
        }
        $key = $keys[$count - 1];
        if (!empty($key) && !empty($scoped[$key]) &&
                preg_match('/\A(true|false)\Z/', $scoped[$key]))
            return (string)$scoped[$key] === 'true'? true: false;
        return NULL;
    }

    /**
     * Gets the specified GET variable validated as a IPv4/6 address.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return string Returns the matching variable.
     **/
    public static function GET_IP4(string $key) {
        $scoped = $_GET;
        $keys = explode('[', str_replace(']', '', $key));
        $count = count($keys);
        for ($i = 0; $i <= $count - 2; $i++) {
            $k = $keys[$i];
            $scoped = !empty($scoped[$k]) &&
                is_array($scoped[$k])? $scoped[$k]: [];
        }
        $key = $keys[$count - 1];
        if (!empty($key) && !empty($scoped[$key]) &&
            filter_var($scoped[$key], FILTER_VALIDATE_IP,
                FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE |
                FILTER_FLAG_IPV4 | FILTER_FLAG_IPV6))
            return (string)$scoped[$key];
        return NULL;
    }

    /**
     * Gets the specified GET variable decoded from Base64 of any type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return mixed Returns the matching variable.
     **/
    public static function GET_Base64(string $key) {
        $scoped = $_GET;
        $keys = explode('[', str_replace(']', '', $key));
        $count = count($keys);
        for ($i = 0; $i <= $count - 2; $i++) {
            $k = $keys[$i];
            $scoped = !empty($scoped[$k]) &&
                is_array($scoped[$k])? $scoped[$k]: [];
        }
        $key = $keys[$count - 1];
        if (!empty($key) && !empty($scoped[$key])) {
            $stream = $scoped[$key];
            return base64_encode(base64_decode($stream, true)) === $stream?
                base64_decode($stream): NULL;
        } else {
            return NULL;
        }
    }

    /**
     * Gets the specified POST variable validated as a STRING type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return string Returns the matching variable.
     **/
    public static function POST_String(string $key) {
        $scoped = $_POST;
        $keys = explode('[', str_replace(']', '', $key));
        $count = count($keys);
        for ($i = 0; $i <= $count - 2; $i++) {
            $k = $keys[$i];
            $scoped = !empty($scoped[$k]) &&
                is_array($scoped[$k])? $scoped[$k]: [];
        }
        $key = $keys[$count - 1];
        if (!empty($key) && isset($scoped[$key]))
            return substr((string)$scoped[$key], 0, 512);
        return NULL;
    }

    /**
     * Gets the specified POST variable validated as a INT type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return int Returns the matching variable.
     **/
    public static function POST_Number(string $key) {
        $scoped = $_POST;
        $keys = explode('[', str_replace(']', '', $key));
        $count = count($keys);
        for ($i = 0; $i <= $count - 2; $i++) {
            $k = $keys[$i];
            $scoped = !empty($scoped[$k]) &&
                is_array($scoped[$k])? $scoped[$k]: [];
        }
        $key = $keys[$count - 1];
        if (!empty($key) && isset($scoped[$key]) &&
                ctype_digit((string)$scoped[$key]))
            return (int)$scoped[$key];
        return NULL;
    }

    /**
     * Gets the specified POST variable validated as a FLOAT type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return float Returns the matching variable.
     **/
    public static function POST_Float(string $key) {
        $scoped = $_POST;
        $keys = explode('[', str_replace(']', '', $key));
        $count = count($keys);
        for ($i = 0; $i <= $count - 2; $i++) {
            $k = $keys[$i];
            $scoped = !empty($scoped[$k]) &&
                is_array($scoped[$k])? $scoped[$k]: [];
        }
        $key = $keys[$count - 1];
        if (!empty($key) && isset($scoped[$key]) &&
                is_numeric((string)$scoped[$key]))
            return (float)$scoped[$key];
        return NULL;
    }

    /**
     * Gets the specified POST variable validated as a BOOLEAN type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return boolean Returns the matching variable.
     **/
    public static function POST_Boolean(string $key) {
        $scoped = $_POST;
        $keys = explode('[', str_replace(']', '', $key));
        $count = count($keys);
        for ($i = 0; $i <= $count - 2; $i++) {
            $k = $keys[$i];
            $scoped = !empty($scoped[$k]) &&
                is_array($scoped[$k])? $scoped[$k]: [];
        }
        $key = $keys[$count - 1];
        if (!empty($key) && !empty($scoped[$key]) &&
                preg_match('/\A(true|false)\Z/', $scoped[$key]))
            return (string)$scoped[$key] === 'true'? true: false;
        return NULL;
    }

    /**
     * Gets the specified POST variable validated as a IPv4/6 address.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return string Returns the matching variable.
     **/
    public static function POST_IP4(string $key) {
        $scoped = $_POST;
        $keys = explode('[', str_replace(']', '', $key));
        $count = count($keys);
        for ($i = 0; $i <= $count - 2; $i++) {
            $k = $keys[$i];
            $scoped = !empty($scoped[$k]) &&
                is_array($scoped[$k])? $scoped[$k]: [];
        }
        $key = $keys[$count - 1];
        if (!empty($key) && !empty($scoped[$key]) &&
            filter_var($scoped[$key], FILTER_VALIDATE_IP,
                FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE |
                FILTER_FLAG_IPV4 | FILTER_FLAG_IPV6))
            return (string)$scoped[$key];
        return NULL;
    }

    /**
     * Gets the specified POST variable decoded from Base64 of any type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @param string|int $key (name) of the variable.
     * @return mixed Returns the matching variable.
     **/
    public static function POST_Base64(string $key) {
        $scoped = $_POST;
        $keys = explode('[', str_replace(']', '', $key));
        $count = count($keys);
        for ($i = 0; $i <= $count - 2; $i++) {
            $k = $keys[$i];
            $scoped = !empty($scoped[$k]) &&
                is_array($scoped[$k])? $scoped[$k]: [];
        }
        $key = $keys[$count - 1];
        if (!empty($key) && !empty($scoped[$key])) {
            $stream = $scoped[$key];
            return base64_encode(base64_decode($stream, true)) === $stream?
                base64_decode($stream): NULL;
        } else {
            return NULL;
        }
    }

    /**
     * Gets the specified COOKIE variable validated as a STRING type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @uses Karting\Skeleton\Cookies::GET to get session variables.
     * @param string|int $key (name) of the variable.
     * @return string Returns the matching variable.
     **/
    public static function COOKIE_String(string $key) {
        if (!empty($key) && !is_null(Cookies::Get($key)))
            return substr((string)Cookies::Get($key), 0, 512);
        return NULL;
    }

    /**
     * Gets the specified COOKIE variable validated as a INT type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @uses Karting\Skeleton\Cookies::GET to get session variables.
     * @param string|int $key (name) of the variable.
     * @return int Returns the matching variable.
     **/
    public static function COOKIE_Number(string $key) {
        if (!empty($key) && !is_null(Cookies::Get($key)) &&
                ctype_digit((string)Cookies::Get($key)))
            return (int)Cookies::Get($key);
        return NULL;
    }

    /**
     * Gets the specified COOKIE variable validated as a FLOAT type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @uses Karting\Skeleton\Cookies::GET to get session variables.
     * @param string|int $key (name) of the variable.
     * @return float Returns the matching variable.
     **/
    public static function COOKIE_Float(string $key) {
        if (!empty($key) && !is_null(Cookies::Get($key)) &&
                is_numeric((string)Cookies::Get($key)))
            return (float)Cookies::Get($key);
        return NULL;
    }

    /**
     * Gets the specified COOKIE variable validated as a BOOLEAN type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @uses Karting\Skeleton\Cookies::GET to get session variables.
     * @param string|int $key (name) of the variable.
     * @return boolean Returns the matching variable.
     **/
    public static function COOKIE_Boolean(string $key) {
        if (!empty($key) && !is_null(Cookies::Get($key)) &&
                preg_match('/\A(true|false)\Z/', (string)Cookies::Get($key)))
            return (string)Cookies::Get($key) === 'true'? true: false;
        return NULL;
    }

    /**
     * Gets the specified COOKIE variable validated as a IPv4/6 address.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @uses Karting\Skeleton\Cookies::GET to get session variables.
     * @param string|int $key (name) of the variable.
     * @return string Returns the matching variable.
     **/
    public static function COOKIE_IP4(string $key) {
        if (!empty($key) && !is_null(Cookies::Get($key)) &&
            filter_var((string)Cookies::Get($key), FILTER_VALIDATE_IP,
                FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE |
                FILTER_FLAG_IPV4 | FILTER_FLAG_IPV6))
            return (string)Cookies::Get($key);
        return NULL;
    }

    /**
     * Gets the specified COOKIE variable decoded from Base64 of any type.
     * Returns NULL when key doesn't exist or type's mismatched.
     *
     * @uses Karting\Skeleton\Cookies::GET to get session variables.
     * @param string|int $key (name) of the variable.
     * @return mixed Returns the matching variable.
     **/
    public static function COOKIE_Base64(string $key) {
        if (!empty($key) && !is_null(Cookies::Get($key))) {
            $stream = (string)Cookies::Get($key);
            return base64_encode(base64_decode($stream, true)) === $stream?
                base64_decode($stream): NULL;
        } else {
            return NULL;
        }
    }
}
