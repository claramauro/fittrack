"use client";

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/shadcn/components/ui/table";
import clsx from "clsx";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto rounded-md border border-zinc-200">
            <Table className="border-separate border-spacing-0">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header, idx) => {
                                const isFirst = idx === 0;
                                const isLast = idx === headerGroup.headers.length - 1;
                                return (
                                    <TableHead
                                        key={header.id}
                                        className={clsx(
                                            "border border-zinc-200 text-center font-bold p-4 bg-gray-100",
                                            isFirst && "sticky left-0 z-10 shadow-sm",
                                            isLast && "sticky right-0 z-10 shadow-sm"
                                        )}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, idx) => (
                            <TableRow
                                key={row.id}
                                className={clsx("hover:bg-zinc-100", idx % 2 !== 0 ? "bg-gray-50" : "bg-white")}>
                                {row.getVisibleCells().map((cell, idx) => {
                                    const isFirst = idx === 0;
                                    const isLast = idx === row.getVisibleCells().length - 1;
                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className={clsx(
                                                "border border-zinc-200 text-center px-3 py-4 bg-inherit",
                                                isFirst && "sticky left-0 z-10 shadow-sm",
                                                isLast && "sticky right-0 z-10 shadow-sm"
                                            )}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                Aucune mesure enregistrée
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
