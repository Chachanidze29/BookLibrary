import { Head, Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { PropsWithChildren } from 'react';

import MainLayout from '@/Layouts/MainLayout';
import { cn } from '@/lib/utils';

const links = [
    { href: 'profile.edit', label: 'Profile' },
    { href: 'reservation.index', label: 'My Reservations' },
    { href: 'checkout.index', label: 'My Checkouts' },
];

export default function Profile({ children }: PropsWithChildren) {
    const { t } = useLaravelReactI18n();

    return (
        <MainLayout>
            <h1 className="container text-3xl font-semibold">{t('Profile')}</h1>

            <div className="container flex flex-col items-start gap-6 md:flex-row">
                <nav className="grid flex-shrink-0 justify-items-start gap-4 md:w-48">
                    {links.map(({ href, label }) => (
                        <Link
                            key={label}
                            href={route(href)}
                            className={cn('text-sm text-muted-foreground', {
                                'font-semibold text-primary':
                                    route().current(href),
                            })}
                        >
                            {t(label)}
                        </Link>
                    ))}
                </nav>

                <div className="w-full min-w-0 space-y-6">{children}</div>
            </div>
        </MainLayout>
    );
}
