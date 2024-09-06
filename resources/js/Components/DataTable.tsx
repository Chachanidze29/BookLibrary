import { router } from '@inertiajs/react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    TableMeta,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { capitalize, startCase, toLower } from 'lodash';
import * as React from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/AlertDialog';
import { Button } from '@/Components/Button';
import { DataTablePagination } from '@/Components/DataTablePagination';
import { DataTableViewOptions } from '@/Components/DataTableViewOptions';
import { Input } from '@/Components/Input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/Table';

interface DataTableProps<TData extends { id?: number }, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData extends { id?: number }, TValue>({
    columns,
    data,
    filterBy,
    massDeleteRoute,
    meta,
}: DataTableProps<TData, TValue> & {
    filterBy: string;
    massDeleteRoute?: string;
    meta?: TableMeta<TData>;
}) {
    const { t } = useLaravelReactI18n();

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        meta,
    });

    const handleMassDelete = () => {
        const ids = table
            .getSelectedRowModel()
            .rows.map((obj) => obj.original.id);

        router.post(route(massDeleteRoute!), { ids });
        table.resetRowSelection();
    };

    return (
        <div className="flex w-full flex-grow flex-col">
            <div className="flex items-center gap-2 pb-4">
                <Input
                    placeholder={t('Start searching by :column...', {
                        column: startCase(toLower(t(filterBy))),
                    })}
                    value={
                        (table
                            .getColumn(filterBy)
                            ?.getFilterValue() as string) ?? ''
                    }
                    onChange={(event) =>
                        table
                            .getColumn(filterBy)
                            ?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <DataTableViewOptions table={table} />

                {table.getSelectedRowModel().rows.length > 0 && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive">
                                {t('Delete')} (
                                {table.getSelectedRowModel().rows.length})
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    {t('Delete rows')}
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    {t(
                                        'Are you sure you want to delete :count row(s)? This action cannot be undone.',
                                        {
                                            count: table.getSelectedRowModel()
                                                .rows.length,
                                        },
                                    )}
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    {t('Cancel')}
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    variant="destructive"
                                    asChild
                                >
                                    <Button onClick={handleMassDelete}>
                                        {t('Delete')}
                                    </Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {t('No results')}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex-grow content-end pt-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    );
}
