import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/Select';
import { SelectOption } from '@/types';

export const FormInputSelect = ({
    label,
    placeholder,
    value,
    options,
    onChange,
    error,
}: {
    label: string;
    placeholder: string;
    value: string;
    options: SelectOption[];
    onChange: (value: string) => void;
    error?: string;
}) => {
    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option.id}
                            value={option.id.toString()}
                        >
                            {option.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <InputError message={error} />
        </div>
    );
};

export default FormInputSelect;
