import { InputError } from '@/Components/InputError';
import { Label } from '@/Components/Label';
import { Textarea } from '@/Components/Textarea';

interface TextareaFormInputProps {
    id: string;
    label: string;
    value: string;
    autoComplete?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
}

export const FormInputTextarea = ({
    id,
    label,
    value,
    onChange,
    error,
}: TextareaFormInputProps) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Textarea
                value={value}
                onChange={onChange}
                id="bio"
                className="resize-none"
            />
            {error && <InputError message={error} />}
        </div>
    );
};

export default FormInputTextarea;
