<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Mews\Purifier\Facades\Purifier;

class PostController extends Controller
{
    /**
     * Exibir uma listagem do recurso.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Defina um valor padrão para a quantidade de posts por página
        $perPage = 5;
    
        // Use o método paginate() para buscar posts com paginação
        $posts = Post::orderBy('created_at', 'desc') // Ordenar por data de criação, mais recentes primeiro
                     ->paginate($perPage);
    
        return response()->json($posts);
    }

    /**
     * Armazenar um recurso recém-criado no armazenamento.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'author' => 'required',
            'category' => 'required',
            'content' => 'required',
            'image' => 'image|mimes:png,jpg|max:2048',
        ]);
    
        $post = new Post;
        $post->author = $request->author;
        $post->category = $request->category;
        $post->content = Purifier::clean($request->content);
    
        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();  
            $request->image->move(public_path('images'), $imageName);
            $post->image = $imageName;
        }
    
        $post->save();
    
        return response()->json($post, 201);
    }

    /**
     * Exibir o recurso especificado.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::findOrFail($id);
        return $post;
    }

    /**
     * Atualizar o recurso especificado no armazenamento.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
    
        $validatedData = $request->validate([
            'author' => 'required',
            'category' => 'required',
            'content' => 'required',
            'image' => 'nullable|image|mimes:png,jpg|max:2048',
        ]);
    
        $post->author = $validatedData['author'];
        $post->category = $validatedData['category'];
        $post->content = Purifier::clean($validatedData['content']);
    
        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $post->image = $imageName;
        }
    
        $post->save();
    
        return response()->json($post);
    }

    /**
     * Remover o recurso especificado do armazenamento.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(null, 204);
    }
}
