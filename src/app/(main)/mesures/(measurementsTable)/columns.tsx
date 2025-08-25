"use client";

import { Measurement } from "@/libs/types/measurement";
import { ColumnDef } from "@tanstack/react-table";
import { PencilIcon, Trash2Icon } from "lucide-react";
import UpdateMeasurementModal from "../updateMeasurementModal";
import moment from "moment";
import DeleteMeasurementModal from "../deleteMeasurementModal";

export const columns: ColumnDef<Measurement>[] = [
    {
        accessorKey: "measuredAt",
        header: "Date",
        cell: ({ row }) => {
            return moment(row.getValue("measuredAt")).format("DD/MM/YYYY");
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
        cell: ({ row }) => {
            const measurement = row.original;
            if (!measurement) return null;
            return (
                <div className="flex justify-center items-center gap-1 min-w-[70px]">
                    <UpdateMeasurementModal measurement={measurement} />
                    <DeleteMeasurementModal measurement={measurement} />
                </div>
            );
        },
    },
];
