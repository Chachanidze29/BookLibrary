import { Link, useForm } from '@inertiajs/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { FormEventHandler } from 'react';

import { Button } from '@/Components/Button';
import FormInputText from '@/Components/FormInputs/FormInputText';
import { FormType, MemberForm } from '@/types/form';

export function Form({
    type,
    initialData,
    memberId,
}: {
    type: FormType;
    initialData: MemberForm;
    memberId?: number;
}) {
    const { t } = useLaravelReactI18n();
    const { data, setData, post, put, processing, errors } =
        useForm<MemberForm>(initialData);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        switch (type) {
            case FormType.Create:
                post(route('admin.members.store'));
                break;
            case FormType.Edit:
                put(route('admin.members.update', memberId));
                break;
            default:
                break;
        }
    };

    const submitButtonText = {
        [FormType.Create]: 'Add',
        [FormType.Edit]: 'Save',
    }[type];

    return (
        <form onSubmit={handleSubmit} className="flex flex-grow flex-col gap-6">
            <div className="grid items-start gap-4 sm:grid-cols-2">
                <FormInputText
                    id="first_name"
                    type="text"
                    label={t('First name')}
                    value={data.first_name}
                    onChange={(e) => setData('first_name', e.target.value)}
                    error={errors.first_name}
                />

                <FormInputText
                    id="last_name"
                    type="text"
                    label={t('Last name')}
                    value={data.last_name}
                    onChange={(e) => setData('last_name', e.target.value)}
                    error={errors.last_name}
                />

                <FormInputText
                    id="email"
                    type="email"
                    label={t('Email')}
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                />

                <FormInputText
                    id="phone_number"
                    type="tel"
                    label={t('Phone number')}
                    value={data.phone_number}
                    onChange={(e) => setData('phone_number', e.target.value)}
                    error={errors.phone_number}
                />

                <FormInputText
                    id="personal_number"
                    type="text"
                    label={t('Personal number')}
                    value={data.personal_number}
                    onChange={(e) => setData('personal_number', e.target.value)}
                    error={errors.personal_number}
                />
            </div>

            <div className="flex flex-grow items-end justify-between">
                <Button variant="ghost" asChild>
                    <Link href={route('admin.members.index')}>{t('Back')}</Link>
                </Button>
                <Button type="submit" disabled={processing}>
                    {t(submitButtonText)}
                </Button>
            </div>
        </form>
    );
}
