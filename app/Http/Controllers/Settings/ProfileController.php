<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileDeleteRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validatedData = $request->validated();
        if ($request->hasFile('avatar')) {
            if ($user->avatar_path && Storage::exists($user->avatar_path)) {
                Storage::delete($user->avatar_path);
            }
            $path = $request->file('avatar')->storePublicly('avatars');
            $pathUrl = Storage::url($path);
            $validatedData['avatar_path'] = $path;
            $validatedData['avatar'] = $pathUrl;
        }

        $user->fill($validatedData);
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();
        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "Berhasil mengubah profile."
        ]);

        return to_route('profile.edit');
    }

    /**
     * Delete the user's profile.
     */
    public function destroy(ProfileDeleteRequest $request): RedirectResponse
    {
        $user = $request->user();
        if ($user->avatar_path && Storage::exists($user->avatar_path)) {
            Storage::delete($user->avatar_path);
        }

        Auth::logout();
        $user->delete(null);

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
