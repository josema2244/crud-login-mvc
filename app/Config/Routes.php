<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

// ---------- Rutas públicas ----------
$routes->post('api/login', 'AuthController::login');
$routes->post('api/logout', 'AuthController::logout');

// ---------- Rutas protegidas: el filtro 'auth' exige sesión ----------
$routes->group('api', ['filter' => 'auth'], static function ($routes) {
    $routes->get('me', 'AuthController::me');

    $routes->get('productos', 'ProductoController::listar');
    $routes->post('productos', 'ProductoController::crear');
    $routes->put('productos/(:num)', 'ProductoController::actualizar/$1');
    $routes->delete('productos/(:num)', 'ProductoController::eliminar/$1');
});