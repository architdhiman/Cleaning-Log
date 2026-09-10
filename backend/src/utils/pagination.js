export function getPagination(page, limit, total) {
    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
    };
}
//# sourceMappingURL=pagination.js.map