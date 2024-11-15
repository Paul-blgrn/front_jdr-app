import { useEffect, useState, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDropzone } from 'react-dropzone';
import { SketchPicker } from 'react-color';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Container, Paper, Typography, IconButton } from '@mui/material';
import { Add as AddIcon, Image as ImageIcon } from '@mui/icons-material';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);
const ItemType = 'ELEMENT';

const DraggableItem = ({ item, children }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id: item.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {children}
        </div>
    );
};

export default function EditorPage() {
    const [layout, setLayout] = useState([]);
    const [items, setItems] = useState([]);
    const [userItems, setUserItems] = useState([]);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [backgroundImageOpacity, setBackgroundImageOpacity] = useState(1);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [backgroundColorOpacity, setBackgroundColorOpacity] = useState(0);
    const [currentShape, setCurrentShape] = useState('rectangle');
    const [editingItemId, setEditingItemId] = useState(null);
    const [newItemName, setNewItemName] = useState(''); 
    
    const [textContent, setTextContent] = useState({});
    // const [itemBorderColor, setItemBorderColor] = useState('#000000');
    // const [itemTextColor, setItemTextColor] = useState('#000000');
    // const [itemFontSize, setItemFontSize] = useState('14px');
    // const [isDragging, setIsDragging] = useState(false);
    const gridRef = useRef(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => setBackgroundImage(reader.result);
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    useEffect(() => {
        if (gridRef.current) {
            const containerHeight = gridRef.current.clientHeight;
            const newLayout = layout.map(item => {
                if (item.y * 30 + item.h * 30 > containerHeight) {
                    return { ...item, y: Math.floor(containerHeight / 30) - item.h };
                }
                return item;
            });
            setLayout(newLayout);
        }
    }, [layout]);

    const onLayoutChange = (newLayout) => {
        if (gridRef.current) {
            const containerHeight = gridRef.current.clientHeight;
            const adjustedLayout = newLayout.map(item => {
                if (item.y * 30 + item.h * 30 > containerHeight) {
                    return { ...item, y: Math.floor(containerHeight / 30) - item.h };
                }
                return item;
            });
            setLayout(adjustedLayout);
        }
    };

    const addNewItem = () => {
        const newItem = {
            id: `item-${userItems.length}`,
            title: newItemName || `Élément ${userItems.length + 1}`,
            content: newItemName || 'Nouvel élément',
            type: currentShape,
        };
    
        setUserItems(prevItems => [...prevItems, newItem]);
    
        const newLayoutItem = {
            i: newItem.id,
            x: 0,
            y: Infinity,
            w: currentShape === 'text' ? 4 : 3,
            h: currentShape === 'text' ? 1 : 3,
        };
    
        setLayout(prevLayout => [...prevLayout, newLayoutItem]);
    
        setNewItemName('');
        setEditingItemId(newItem.id); // Mettre l'élément en mode édition
    };

    const handleDelete = (id) => {
        setUserItems(userItems.filter(item => item.id !== id));
        setLayout(layout.filter(l => l.i !== id));
    };

    const handleEdit = (id) => {
        setEditingItemId(id);
    };

    const handleTextChange = (content, id) => {
        setTextContent(prevContent => ({ ...prevContent, [id]: content }));
    };

    const handleTitleChange  = (event, id) => {
        const newTitle  = event.target.value;
        setUserItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, title: newTitle } : item
            )
        );
    };
    
    const handleTitleBlur = () => {
        setEditingItemId(null); // Quitter le mode d'édition
    };
    
    const handleTitleKeyDown = (event, id) => {
        if (event.key === 'Enter') {
            handleTitleBlur(); // Quitter le mode d'édition en appuyant sur "Enter"
        }
    };

    const handleBackgroundColorChange = (e) => {
        const color = e.target.value;
        setBackgroundColor(color);
    };

    const handleBackgroundColorOpacityChange = (e) => {
        setBackgroundColorOpacity(e.target.value);
    };

    const handleBackgroundImageOpacityChange = (e) => {
        setBackgroundImageOpacity(e.target.value);
    };

    const resetBackgroundImage = () => {
        setBackgroundImage(null);
        setBackgroundImageOpacity(1); // Réinitialiser l'opacité de l'image
        console.log('Background image and opacity reset');
    };

    const makeBackgroundColorTransparent = () => {
        setBackgroundColor('#ffffff'); // Rendre la couleur de fond transparente
        setBackgroundColorOpacity(0);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Container style={{ position: 'relative', height: '100vh', width: '100vw', padding: '20px', overflow: 'hidden' }}>
                <div
                    style={{
                        background: backgroundImage
                            ? `url(${backgroundImage}) no-repeat center/cover`
                            : backgroundColor,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: -1,
                        width: '100%',
                        overflowY: 'auto',
                    }}
                />

                <Paper style={{ padding: '20px', zIndex: 1, position: 'relative' }}>
                    <Typography variant="h4" gutterBottom>
                        Template Editor
                    </Typography>

                    <div style={{ marginBottom: '20px' }}>
                        <IconButton color="primary" onClick={() => addNewItem('text')}>
                            <AddIcon />
                        </IconButton>
                        <IconButton color="secondary" onClick={() => addNewItem('image')}>
                            <AddIcon />
                        </IconButton>
                    </div>

                    <SketchPicker
                        color={backgroundColor}
                        onChangeComplete={(color) => setBackgroundColor(color.hex)}
                        style={{ marginBottom: '20px' }}
                    />

                    <Paper {...getRootProps()} style={dropzoneStyle}>
                        <input {...getInputProps()} />
                        <Typography>Drop an image here to set as background</Typography>
                        <ImageIcon style={{ fontSize: 50 }} />
                    </Paper>

                    <ResponsiveGridLayout
                        className="layout"
                        layouts={{ lg: layout }}
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 }}
                        rowHeight={30}
                        onLayoutChange={onLayoutChange}
                        isResizable={true}
                        isDraggable={true}
                        preventCollision={false}
                    >
                        {userItems.map((item,index) => (
                            <div 
                                key={item.id} 
                                data-grid={{ i: item.id, x: (index % 3) * 4, y: Math.floor(index / 3), w: 3, h: 1 }}
                                style={{
                                    zIndex: '1',
                                }}
                            >
                                <DraggableItem item={item}>


                                    <button 
                                        onClick={() => handleDelete(item.id)} 
                                        style={{ position: 'absolute', top: 0, right: 0, zIndex:'-10' }}
                                    >
                                        X
                                    </button>
                                
                                </DraggableItem>
                            </div>
                        ))}
                    </ResponsiveGridLayout>
                </Paper>
            </Container>
        </DndProvider>
    )
}

const dropzoneStyle = {
    border: '2px dashed #007bff',
    padding: '20px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    marginBottom: '20px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const itemStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    background: '#fff',
    borderRadius: '5px',
};
