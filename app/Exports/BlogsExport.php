<?php

namespace App\Exports;

use App\Models\Blog;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BlogsExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        return Blog::with('user')
            ->latest()
            ->get()
            ->map(function ($blog) {
                return [
                    'ID' => $blog->id,
                    'Title' => $blog->title,
                    'Description' => $blog->description,
                    'Author' => $blog->user?->name,
                    'Created At' => $blog->created_at->format('Y-m-d H:i:s'),
                ];
            });
    }

    public function headings(): array
    {
        return [
            'ID',
            'Title',
            'Description',
            'Author',
            'Created At',
        ];
    }
}
