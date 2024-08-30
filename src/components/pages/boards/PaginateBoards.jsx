import styled from "styled-components";

export default function PaginateBoards({
        currentPage,
        totalPages,
        onPageChange,
        className = '',
        activeClassName = 'active',
    }) {

    const pages = Array(totalPages).fill(0).map((_, index) => index + 1);

    return (
        <PaginateStyled className={className}>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={page === currentPage ? `${activeClassName} page-button` : 'page-button'}
                >
                    {page}
                </button>
            ))}
    </PaginateStyled>
    )
}

const PaginateStyled = styled.div`
    display: flex;
    justify-content: center;
    gap: 8px;

    .page-button {
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
        color: #333;
        margin-bottom: 5px;

        &:hover {
            background-color: #e0e0e0;
            border-color: #ccc;
        }
    }

    .active {
        background-color: ${props => props.activeBackground || '#007BFF'};
        color: #fff;
        border-color: ${props => props.activeBorder || '#007BFF'};
        font-weight: bold;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
`;

