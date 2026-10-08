<?php

namespace App\Controllers;

use App\Models\ProductoModel;

class ProductoController extends BaseController
{
    private array $reglas = [
        'nombre' => 'required|max_length[120]',
        'precio' => 'required|numeric|greater_than_equal_to[0]',
    ];

    public function listar()
    {
        $productos = (new ProductoModel())->orderBy('id', 'DESC')->findAll();

        return $this->response->setJSON($productos);
    }

    public function crear()
    {
        $datos = $this->request->getJSON(true) ?? [];

        if (! $this->validateData($datos, $this->reglas)) {
            return $this->errorValidacion();
        }

        (new ProductoModel())->insert([
            'nombre' => trim($datos['nombre']),
            'precio' => $datos['precio'],
        ]);

        return $this->response->setStatusCode(201)->setJSON(['mensaje' => 'Producto creado']);
    }

    public function actualizar($id)
    {
        $datos = $this->request->getJSON(true) ?? [];

        if (! $this->validateData($datos, $this->reglas)) {
            return $this->errorValidacion();
        }

        (new ProductoModel())->update($id, [
            'nombre' => trim($datos['nombre']),
            'precio' => $datos['precio'],
        ]);

        return $this->response->setJSON(['mensaje' => 'Producto actualizado']);
    }

    public function eliminar($id)
    {
        (new ProductoModel())->delete($id);

        return $this->response->setJSON(['mensaje' => 'Producto eliminado']);
    }

    private function errorValidacion()
    {
        return $this->response
            ->setStatusCode(422)
            ->setJSON(['error' => implode(', ', $this->validator->getErrors())]);
    }
}