import { Input } from '@/Components/Input';
import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import { FormType } from '@/types/form';

interface FileFormInputProps {
    id: string;
    type: FormType;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export const FormInputFile = ({
    id,
    type,
    label,
    onChange,
    error,
}: FileFormInputProps) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input
                type="file"
                name="image"
                required={type === FormType.Edit ? false : true}
                onChange={onChange}
            />
            {error && <InputError message={error} />}
        </div>
    );
};

export default FormInputFile;
