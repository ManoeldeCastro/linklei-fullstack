<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aqui é onde você pode registrar rotas API para sua aplicação. Essas
| rotas são carregadas pelo RouteServiceProvider dentro de um grupo que
| é atribuído ao grupo de middleware "api". Aproveite para construir sua API!
|
*/

// Rotas para o controlador de posts
Route::apiResource('posts', PostController::class);

// A rota apiResource já inclui as seguintes rotas:
// GET /posts - index
// POST /posts - store
// GET /posts/{post} - show
// PUT/PATCH /posts/{post} - update
// DELETE /posts/{post} - destroy
