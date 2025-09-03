<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController; // <-- ¿Importaste el controlador?

// La ruta raíz no la necesitamos para el login, la puedes quitar o dejar.
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Estas son las dos rutas cruciales
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Nota: Laravel 11 ya no tiene la ruta /user por defecto aquí, la hemos movido de la guía anterior.
// Si quieres una ruta protegida para probar el token, puedes añadirla:
Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});