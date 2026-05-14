<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rules;

class UserController extends Controller
{
    /**
     * Menampilkan halaman monitoring user.
     */
    public function index()
    {
        return inertia('users/index', [
            'users' => User::orderBy('role', 'asc')->get()
        ]);
    }

    /**
     * Menyimpan petugas baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', Rules\Password::defaults()],
            'jabatan' => 'nullable|string|max:255',
            'pendidikan_terakhir' => 'nullable|string|max:255',
            'role' => 'required|in:admin,petugas',
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'jabatan' => $validated['jabatan'],
            'pendidikan_terakhir' => $validated['pendidikan_terakhir'],
            'role' => $validated['role'],
        ]);

        return Redirect::back()->with('message', 'Petugas berhasil ditambahkan.');
    }

    /**
     * Memperbarui data petugas.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,' . $user->id,
            'jabatan' => 'nullable|string|max:255',
            'pendidikan_terakhir' => 'nullable|string|max:255',
            'role' => 'required|in:admin,petugas',
        ]);

        $user->update($validated);

        return Redirect::back()->with('message', 'Data petugas berhasil diperbarui.');
    }

    /**
     * Menghapus petugas.
     */
    public function destroy(User $user)
    {
        if ($user->role === "admin") {
            return Redirect::back()->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }
        $user->delete(null);
        return Redirect::back()->with('message', 'Petugas berhasil dihapus.');
    }
}
