import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center my-4">
            <ul className="flex space-x-2">
                {pages.map((page) => (
                    <li key={page}>
                        <a
                            href="#"
                            className={`px-3 py-2 rounded-lg ${page === currentPage ? 'bg-gray-300' : ''
                                }`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
