import { forwardRef } from 'react';

import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';

interface TextFormInputProps {
    id: string;
    type: string;
    label: string;
    value: string;
    autoComplete?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string;
    autoFocus?: boolean;
}

export const FormInputText = forwardRef<HTMLInputElement, TextFormInputProps>(
    (
        {
            id,
            type,
            label,
            value,
            autoComplete,
            onChange,
            error,
            className,
            autoFocus,
        },
        ref,
    ) => {
        return (
            <div className={`grid gap-2 ${className || ''}`}>
                <Label htmlFor={id}>{label}</Label>
                <Input
                    type={type}
                    value={value}
                    onChange={onChange}
                    id={id}
                    autoComplete={autoComplete}
                    ref={ref}
                    autoFocus={autoFocus}
                />
                {error && <InputError message={error} />}
            </div>
        );
    },
);

export default FormInputText;
