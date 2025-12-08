'use client'

import { getStatusConfig } from "@/lib/status-utils";
import { Badge } from "../ui/badge";

interface StatusBadgeProps {
    status: string;
    showIcon?: boolean;
}

export default function StatusBadge({
    status,
    showIcon = false,
}: StatusBadgeProps) {
    const config = getStatusConfig(status);
    const IconComponent = config.icon;

    return (
        <Badge variant={config.variant} className={config.className}>
            {showIcon && <IconComponent className="w-3 h-3 mr-1" />}
            {config.label}
        </Badge>
    )
}