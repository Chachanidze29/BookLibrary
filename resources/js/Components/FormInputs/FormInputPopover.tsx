import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/Components/Button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/Components/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/Components/Popover';
import { cn } from '@/lib/utils';

interface FormInputPopoverProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    inputValue: string;
    setInputValue: (value: string) => void;
    options: any[];
    selectedOption: any;
    onSelect: (value: any) => void;
    renderOption: (option: any) => JSX.Element;
    emptyMessage: string;
    placeholder: string;
    label?: string;
    disabled?: boolean;
}

export const FormInputPopover: React.FC<FormInputPopoverProps> = ({
    isOpen,
    setIsOpen,
    inputValue,
    setInputValue,
    options,
    selectedOption,
    onSelect,
    renderOption,
    emptyMessage,
    placeholder,
    label,
    disabled,
}) => {
    return (
        <div className="grid gap-2">
            {label && <label>{label}</label>}

            <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isOpen}
                        className="h-auto justify-between"
                        disabled={disabled}
                    >
                        {selectedOption
                            ? renderOption(selectedOption)
                            : placeholder}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                    <Command>
                        <CommandInput
                            value={inputValue}
                            onValueChange={setInputValue}
                            placeholder={placeholder}
                        />
                        <CommandList>
                            <CommandEmpty>{emptyMessage}</CommandEmpty>
                            <CommandGroup>
                                <CommandList>
                                    {options.map((option) => (
                                        <CommandItem
                                            key={option.id}
                                            value={option.value}
                                            onSelect={() => {
                                                onSelect(option);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <CheckIcon
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    selectedOption === option
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                            {renderOption(option)}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default FormInputPopover;
