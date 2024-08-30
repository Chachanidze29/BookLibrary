<?php

namespace App\Console\Commands;

use App\Enums\RolesEnum;
use App\Models\User;
use Illuminate\Console\Command;

class MakeSuperAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:make-super-admin {email : The email of the user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make a user a super admin';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)
            ->first();
        $user->assignRole(RolesEnum::SUPERADMIN);
        $user->markEmailAsVerified();
    }
}
