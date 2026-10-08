<?php

namespace App\Controllers;

use App\Models\UsuarioModel;

class AuthController extends BaseController
{
    public function login()
    {
        $datos = $this->request->getJSON(true) ?? [];

        $usuario = (new UsuarioModel())
            ->where('usuario', $datos['usuario'] ?? '')
            ->first();

        
        if (! $usuario || ! password_verify($datos['password'] ?? '', $usuario['password'])) {
            return $this->response
                ->setStatusCode(401)
                ->setJSON(['error' => 'Usuario o contraseña incorrectos']);
        }

        session()->regenerate();
        session()->set([
            'usuario_id' => $usuario['id'],
            'usuario'    => $usuario['usuario'],
        ]);

        return $this->response->setJSON(['usuario' => $usuario['usuario']]);
    }

    public function logout()
    {
        session()->destroy();

        return $this->response->setJSON(['mensaje' => 'Sesión cerrada']);
    }

    public function me()
    {
        return $this->response->setJSON(['usuario' => session()->get('usuario')]);
    }
}