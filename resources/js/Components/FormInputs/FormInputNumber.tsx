import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';

interface FormInputNumberProps {
    id: string;
    label: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    description?: string;
}

export const FormInputNumber = ({
    id,
    label,
    value,
    min = 1,
    max,
    step = 1,
    onChange,
    error,
    description,
}: FormInputNumberProps) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                type="number"
                value={value}
                onChange={onChange}
                id={id}
                min={min}
                max={max}
                step={step}
            />
            {description && (
                <span className="text-xs text-muted-foreground">
                    {description}
                </span>
            )}
            {error && <InputError message={error} />}
        </div>
    );
};

export default FormInputNumber;
