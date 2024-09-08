import { Link } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';

import ApplicationLogo from '@/Components/ApplicationLogo';
import { Avatar, AvatarFallback } from '@/Components/Avatar';
import { Button } from '@/Components/Button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from '@/Components/Drawer';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/DropdownMenu';
import HeartSolidIcon from '@/Components/HeartSolidIcon';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/Components/NavigationMenu';
import { AdminNav } from '@/Layouts/Partials/AdminNav';
import { User } from '@/types/model';

export default function Header({ user }: { user?: User }) {
    const { getLocales, currentLocale, setLocale, t } = useLaravelReactI18n();

    function handleLocaleChange(locale: string) {
        setLocale(locale);
        localStorage.setItem('locale', locale);
    }

    function getLocaleLabel(locale: string) {
        switch (locale) {
            case 'en':
                return 'Eng';
            case 'ka':
                return 'Geo';
            default:
                return locale.charAt(0).toUpperCase() + locale.slice(1);
        }
    }

    return (
        <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex gap-6">
                    <div className="flex items-center">
                        <Link href="/">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                    </div>

                    <NavigationMenu className="hidden md:flex">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                    active={route().current('home')}
                                >
                                    <Link href={route('home')}>
                                        {t('Home')}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                    active={route().current('catalog')}
                                >
                                    <Link href={route('catalog')}>
                                        {t('Catalog')}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                    active={route().current('about')}
                                >
                                    <Link href={route('about')}>
                                        {t('About Us')}
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            {user?.is_admin && <AdminNav />}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="flex items-center gap-4">
                    {user && !user?.is_admin && (
                        <Link href={route('wishlist')}>
                            <HeartSolidIcon />
                        </Link>
                    )}

                    <div className="flex items-center gap-4">
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger>
                                <div className="inline-flex items-center gap-2">
                                    <span className="text-sm">
                                        {getLocaleLabel(currentLocale())}
                                    </span>
                                    <ChevronDownIcon size={14} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {getLocales().map((locale) => (
                                    <DropdownMenuItem
                                        key={locale}
                                        onClick={() =>
                                            handleLocaleChange(locale)
                                        }
                                    >
                                        {getLocaleLabel(locale)}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Drawer>
                            <DrawerTrigger asChild className="md:hidden">
                                <Button variant="outline" size="icon">
                                    <MenuIcon />
                                </Button>
                            </DrawerTrigger>
                            <DrawerContent className="md:hidden">
                                <DrawerHeader className="text-start">
                                    <div className="flex justify-end">
                                        <DrawerClose>
                                            <XIcon />
                                        </DrawerClose>
                                    </div>

                                    {user ? (
                                        <Link
                                            href={route('profile.edit')}
                                            className="flex flex-col items-center gap-2 justify-self-center"
                                        >
                                            <Avatar className="h-16 w-16">
                                                <AvatarFallback className="text-2xl">
                                                    {user.first_name[0]}
                                                    {user.last_name[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <p className="font-bold">
                                                {user.first_name}{' '}
                                                {user.last_name}
                                            </p>
                                        </Link>
                                    ) : null}

                                    <Link href={route('home')}>
                                        {t('Home')}
                                    </Link>
                                    <Link href={route('catalog')}>
                                        {t('Catalog')}
                                    </Link>
                                    <Link href={route('about')}>
                                        {t('About Us')}
                                    </Link>

                                    {!user?.is_admin ? (
                                        <>
                                            <Link href={route('profile.edit')}>
                                                {t('Profile')}
                                            </Link>
                                            <Link href={route('wishlist')}>
                                                {t('My Wishlist')}
                                            </Link>
                                            <Link
                                                href={route(
                                                    'reservation.index',
                                                )}
                                            >
                                                {t('Reservations')}
                                            </Link>
                                        </>
                                    ) : null}

                                    {user?.is_admin && (
                                        <AdminNav mobile={true} />
                                    )}
                                </DrawerHeader>
                                <DrawerFooter className="border-t">
                                    {user ? (
                                        <DrawerClose asChild>
                                            <Button asChild>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                >
                                                    {t('Log Out')}
                                                </Link>
                                            </Button>
                                        </DrawerClose>
                                    ) : (
                                        <>
                                            <Button variant="outline" asChild>
                                                <Link href={route('login')}>
                                                    {t('Log in')}
                                                </Link>
                                            </Button>
                                            <Button asChild>
                                                <Link href={route('register')}>
                                                    {t('Register')}
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </div>
                    <div className="hidden md:flex md:items-center md:gap-4">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarFallback>
                                            {user.first_name[0]}
                                            {user.last_name[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href={route('profile.edit')}>
                                            {t('Profile')}
                                        </Link>
                                    </DropdownMenuItem>
                                    {!user?.is_admin && (
                                        <>
                                            <DropdownMenuItem asChild>
                                                <Link href={route('wishlist')}>
                                                    {t('My Wishlist')}
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={route(
                                                        'reservation.index',
                                                    )}
                                                >
                                                    {t('My Reservations')}
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link
                                                    href={route(
                                                        'checkout.index',
                                                    )}
                                                >
                                                    {t('My Checkouts')}
                                                </Link>
                                            </DropdownMenuItem>
                                        </>
                                    )}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="w-full"
                                        >
                                            {t('Log Out')}
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button variant="outline" asChild>
                                    <Link href={route('login')}>
                                        {t('Log in')}
                                    </Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('register')}>
                                        {t('Register')}
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
