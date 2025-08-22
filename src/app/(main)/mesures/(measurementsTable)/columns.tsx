"use client";

import { Measurement } from "@/libs/types/measurement";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, Trash2Icon } from "lucide-react";

export const columns: ColumnDef<Measurement>[] = [
    {
        accessorKey: "measuredAt",
        header: "Date",
        cell: ({ row }) => {
            return new Date(row.getValue("measuredAt")).toLocaleDateString();
        },
    },
    {
        accessorKey: "weight",
        header: "Poids (kg)",
        cell: ({ getValue }) => {
            const value = getValue();
            return value === null || value === "" ? "-" : value;
        },
    },
    {
        accessorKey: "chest",
        header: "Poitrine (cm)",
        cell: ({ getValue }) => {
            const value = getValue();
            return value === null || value === "" ? "-" : value;
        },
    },
    {
        accessorKey: "underbust",
        header: "Sous poitrine (cm)",
        cell: ({ getValue }) => {
            const value = getValue();
            return value === null || value === "" ? "-" : value;
        },
    },
    {
        accessorKey: "waist",
        header: "Taille (cm)",
        cell: ({ getValue }) => {
            const value = getValue();
            return value === null || value === "" ? "-" : value;
        },
    },
    {
        accessorKey: "belly",
        header: "Ventre (cm)",
        cell: ({ getValue }) => {
            const value = getValue();
            return value === null || value === "" ? "-" : value;
        },
    },
    {
        accessorKey: "hips",
        header: "Hanches (cm)",
        cell: ({ getValue }) => {
            const value = getValue();
            return value === null || value === "" ? "-" : value;
        },
    },
    {
        accessorKey: "thigh",
        header: "Cuisse (cm)",
        cell: ({ getValue }) => {
            const value = getValue();
            return value === null || value === "" ? "-" : value;
        },
    },
    {
        accessorKey: "arm",
        header: "Bras (cm)",
        cell: ({ getValue }) => {
            const value = getValue();
            return value === null || value === "" ? "-" : value;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <div className="flex justify-center items-center gap-1 min-w-[70px]">
                <button
                    type="button"
                    title="Modifier ces données"
                    aria-label="Modifier ces données"
                    className="hover:cursor-pointer hover:scale-110">
                    <PencilIcon className="size-4.5 text-gray-500" />
                </button>
                <button
                    title="Supprimer ces données"
                    aria-label="Supprimer ces données"
                    className="hover:cursor-pointer hover:scale-110">
                    <Trash2Icon className="size-4.5 text-rose-400" />
                </button>
            </div>
        ),
    },
];
