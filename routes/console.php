<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Models\Blog;
use Carbon\Carbon;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function () {
    $count = Blog::whereNull('deleted_at')
        ->where('created_at', '<', now()->subMinutes(5))
        ->count();

    if ($count > 0) {
        logger("Auto deleted {$count} blogs older than 5 minutes");
    }

    Blog::whereNull('deleted_at')
        ->where('created_at', '<', now()->subMinutes(5))
        ->delete();
})->everyMinute();

