<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with('user')
            ->latest()
            ->paginate(9)
            ->through(function ($blog) {
                return [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'description' => $blog->description,
                    'created_at' => $blog->created_at,
                    'user' => $blog->user,
                    'cover_url' => $blog->getFirstMediaUrl('cover'),
                ];
            });
            

        return Inertia::render('Blogs/Index', [
            'blogs' => $blogs,
        ]);
    }

    // Display the specified blog.
    public function show(Blog $blog)
    {
        $blog->load('user');
        
        return Inertia::render('Blogs/Show', [
            'blog' => [
                'id' => $blog->id,
                'title' => $blog->title,
                'description' => $blog->description,
                'created_at' => $blog->created_at,
                'user' => $blog->user,
                'cover_url' => $blog->getFirstMediaUrl('cover'),
            ],
        ]);
    }
}
