<?php

namespace App\Services;

use App\Enums\RolesEnum;
use App\Models\User;
use App\Notifications\MemberAdded;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class MemberService
{
    /**
     * @param array $data
     *
     * @return User
     *
     * @throws Exception
     */
    public function createMember(array $data): User
    {
        $password = Str::random(8);

        $member = User::create([
            ...$data,
            'password' => Hash::make($password),
        ])->assignRole(RolesEnum::MEMBER);

        $member->notify(new MemberAdded($password));
        $member->sendEmailVerificationNotification();

        return $member;
    }

    /**
     * @param array $data
     * @param string $id
     *
     * @return User
     *
     * @throws Exception
     */
    public function updateMember(array $data, string $id): User
    {
        $member = User::findOrFail($id);
        $member->update($data);

        return $member;
    }
}
