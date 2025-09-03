<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Aquí puedes configurar los encabezados para el Cross-Origin Resource Sharing.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        // ¡¡ESTA ES LA LÍNEA MÁS IMPORTANTE!!
        // Especificamos EXACTAMENTE el origen de nuestro frontend.
        'http://localhost:3000',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true, // <-- ¡ESTA ES LA SEGUNDA LÍNEA MÁS IMPORTANTE!
                                   // Le dice a Laravel que está bien recibir peticiones con credenciales.

];