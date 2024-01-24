import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function GlobalPagination({ totalPages, currentPage, onChange }) {
    const [active, setActive] = React.useState(currentPage);

    const getItemProps = (index) => ({
        variant: active === index ? "filled" : "text",
        color: "gray",
        onClick: () => {
            setActive(index);
            onChange(index);
        },
        className: "rounded-full",
    });

    const next = () => {
        if (active === totalPages) return;

        setActive(active + 1);
        onChange(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
        onChange(active - 1);
    };

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    return (
        <div className="flex items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
                {Array.from(Array(totalPages)).map((_, index) => {
                    if (index >= startPage && index <= endPage) {
                        return (
                            <IconButton key={index} {...getItemProps(index + 1)}>
                                {index + 1}
                            </IconButton>
                        );
                    }

                    return null;
                })}
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2 rounded-full"
                onClick={next}
                disabled={active === totalPages}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}
