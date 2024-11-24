module.exports = {
    useDrag: jest.fn(() => [{ isDragging: false }, jest.fn()]),
    useDrop: jest.fn(() => [{ isOver: false }, jest.fn()]),
    DndProvider: ({ children }) => children,
};