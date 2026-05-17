<?php

namespace App\Http\Requests\Settings;

use App\Concerns\ProfileValidationRules;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class ProfileUpdateRequest extends FormRequest
{
    use ProfileValidationRules;

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = $this->profileRules($this->user()->id);

        // 2. Tambahkan aturan validasi ketat untuk file avatar
        $rules['avatar'] = [
            'nullable',             // Boleh kosong jika user hanya ingin ubah nama/email
            File::image()           // Harus berupa file gambar (jpg, jpeg, png, webp, dll)
                ->max(2048)         // Ukuran maksimal 2048 Kilobytes (2 Megabytes)
        ];

        return $rules;
    }
}
