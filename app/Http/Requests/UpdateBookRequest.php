<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateBookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'string|max:255',
            'isbn' => 'string|max:255|unique:books,isbn,' . $this->book->id,
            'description' => 'nullable|string|max:500',
            'publication_date' => 'date',
            'language_id' => 'integer|exists:languages,id',
            'genres' => 'array',
            'genres.*' => 'integer|exists:genres,id',
            'authors' => 'array',
            'authors.*' => 'integer|exists:authors,id',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
