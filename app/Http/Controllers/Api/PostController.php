<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Exibir uma listagem do recurso.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Post::all();
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
        $post->content = $request->content;
    
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
            'author' => 'required|max:255',
            'category' => 'required|max:255',
            'content' => 'required',
            'image' => 'nullable|image|mimes:png,jpg|max:2048', // 'nullable' permite que a imagem seja opcional
        ]);
    
        // Atualizar campos do post manualmente
        $post->author = $validatedData['author'];
        $post->category = $validatedData['category'];
        $post->content = $validatedData['content'];
    
        if ($request->hasFile('image')) {
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $post->image = $imageName;
        }
    
        $post->save();
    
        return response()->json($post);
    }
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(null, 204);
    }
}
