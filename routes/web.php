<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BlogController as PublicBlogController;
use App\Http\Controllers\Admin\BlogController as AdminBlogController;

Route::get('/', [PublicBlogController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/blogs/{blog}', [PublicBlogController::class, 'show'])->name('blogs.show');
});

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::prefix('blogs')->name('blogs.')->group(function () {

        Route::get('/', [AdminBlogController::class, 'index'])->name('index');
        Route::get('/create', [AdminBlogController::class, 'create'])->name('create');
        Route::get('/export', [AdminBlogController::class, 'export'])->name('export');
        Route::post('/', [AdminBlogController::class, 'store'])->name('store');
        Route::get('/{blog}', [AdminBlogController::class, 'show'])->name('show');
        Route::get('/{blog}/edit', [AdminBlogController::class, 'edit'])->name('edit');
        Route::put('/{blog}', [AdminBlogController::class, 'update'])->name('update');
        Route::delete('/{blog}', [AdminBlogController::class, 'destroy'])->name('destroy');
    });
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';
