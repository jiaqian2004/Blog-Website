<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Exports\BlogsExport;
use Maatwebsite\Excel\Facades\Excel;

class BlogController extends Controller
{
    //Display a listing of the blogs.
    public function index()
    {
        $blogs = Blog::with('user')
            ->latest()
            ->get()
            ->map(function ($blog) {
                return [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'description' => $blog->description,
                    'created_at' => $blog->created_at,
                    'user' => $blog->user,
                    'cover_url' => $blog->getFirstMediaUrl('cover'),
                ];
            });


        return Inertia::render('Admin/Blogs/Index', [
            'blogs' => $blogs,
        ]);
    }


    // Display the form for creating a new blog.
    public function create()
    {
        return Inertia::render('Admin/Blogs/Create');
    }

    // Store a newly created blog in storage.
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'cover' => ['nullable', 'image', 'max:2048'],
        ]);

        $blog = Blog::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'user_id' => $request->user()->id,
        ]);
        if ($request->hasFile('cover')) {
            $blog
                ->addMediaFromRequest('cover')
                ->toMediaCollection('cover');
        }

        return redirect()->route('admin.blogs.index')
            ->with('success', 'Blog created successfully');
    }

    // Display the specified blog.
    public function show(Blog $blog)
    {
        $blog->load('user');

        return Inertia::render('Admin/Blogs/Show', [
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


    // Show the form for editing the specified blog.
    public function edit(Blog $blog)
    {
        return Inertia::render('Admin/Blogs/Edit', [
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

    // Update the specified blog in storage.
    public function update(Request $request, Blog $blog)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'cover' => ['nullable', 'image', 'max:2048'],
        ]);

        $blog->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        if ($request->hasFile('cover')) {
            // 👉 只保留一个 cover（replace）
            $blog->clearMediaCollection('cover');

            $blog
                ->addMediaFromRequest('cover')
                ->toMediaCollection('cover');
        }

        return redirect()
            ->route('admin.blogs.index')
            ->with('success', 'Blog updated successfully');
    }


    // Remove the specified blog from storage.
    public function destroy(Blog $blog)
    {
        $blog->delete(); // soft delete

        return redirect()
            ->route('admin.blogs.index')
            ->with('success', 'Blog deleted successfully');
    }

    // Export blogs as CSV.
    public function export()
    {
        return Excel::download(
            new BlogsExport,
            'blogs.xlsx'
        );
    }
}
