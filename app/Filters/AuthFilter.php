<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

class AuthFilter implements FilterInterface
{
    // Se ejecuta ANTES de cada ruta protegida: sin sesión responde 401
    public function before(RequestInterface $request, $arguments = null)
    {
        if (! session()->get('usuario_id')) {
            return service('response')
                ->setStatusCode(401)
                ->setJSON(['error' => 'No autenticado']);
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }
}