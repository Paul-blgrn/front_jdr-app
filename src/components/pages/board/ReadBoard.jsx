import { useEffect, useState, useRef, useContext  } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { getBoardById } from '../../../actions/boardDetailActions';

import { Responsive, WidthProvider } from 'react-grid-layout';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { useDropzone } from 'react-dropzone';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SketchPicker } from 'react-color';
import { Stage, Layer, Rect, Circle, Ellipse } from 'react-konva';
import { Editor } from '@tinymce/tinymce-react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import UserContext from '../../../context/UserContext';
import { Switch } from '@mui/material'; 
import Menu from '../editor/Menu';

import MainMenu from '../nav/MainMenu'
import Logo from '../../reusable-ui/Logo';

import UpdateBoard from '../boards/UpdateBoard';

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

export default function ReadBoard() {
    const { isEditingTemplate, setIsEditingTemplate } = useContext(UserContext);
    const { isEditingBoard, setIsEditingBoard } = useContext(UserContext);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { board, loading, error } = useSelector((state) => state.board_details);
    const navigate = useNavigate();
    const { user, isLoggedIn } = useSelector(state => state.user);
    const gridRef = useRef(null);

    const handleEditSwitchChange = (event) => {
        setIsEditingTemplate(event.target.checked); // Toggle the editing mode
    };

    const handleEditingBoard = (event) => {
        setIsEditingBoard(event.target.checked);
    };

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
    const [itemBorderColor, setItemBorderColor] = useState('#000000');
    const [itemTextColor, setItemTextColor] = useState('#000000');
    const [itemFontSize, setItemFontSize] = useState('14px');
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isLoggedIn && !user) {
          navigate('/');
        }
        return;
    }, [isLoggedIn, user, navigate]);

    useEffect(() => {
        dispatch(getBoardById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (board) {
            setItems([
                { id: 'name', content: `Nom du Tableau: ${board.name}`, type: 'text' },
                { id: 'description', content: `Description: ${board.description}`, type: 'text' },
                { id: 'users', content: `Utilisateurs: ${board.users_count}/${board.capacity}`, type: 'text' },
                { id: 'code', content: `Code du Tableau: ${board.code}`, type: 'text' },
            ]);

            setLayout([
                { i: 'name', x: 0, y: 0, w: 6, h: 1, static: false },
                { i: 'description', x: 0, y: 1, w: 6, h: 1, static: false },
                { i: 'users', x: 0, y: 2, w: 3, h: 1, static: false },
                { i: 'code', x: 3, y: 2, w: 3, h: 1, static: false },
            ]);
        }
    }, [board]);

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

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => setBackgroundImage(reader.result);
        reader.readAsDataURL(file);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

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

    if (loading) {
        return <p>Chargement des détails du board...</p>;
    }

    if (error) {
        return <p>Erreur : {error.message || error}</p>; // Assurez-vous que error est une chaîne ou un objet avec une clé `message`
    }
    

    return (
        <DndProvider backend={HTML5Backend}>
            <Logo />
            <MainMenu />
            <div style={{ position: 'relative', minHeight: '100vh' }}>
                <div 
                    style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        background: backgroundImage ? 
                            `url(${backgroundImage}) no-repeat center/cover` : 
                            `rgba(${parseInt(backgroundColor.slice(1, 3), 16)}, ${parseInt(backgroundColor.slice(3, 5), 16)}, ${parseInt(backgroundColor.slice(5, 7), 16)}, ${backgroundColorOpacity})`,
                        opacity: backgroundImage ? backgroundImageOpacity : backgroundColorOpacity, // Utilise backgroundColorOpacity ici pour que ça change en fonction
                        zIndex: -1 
                    }}
                />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h1>{board.name}</h1>
                    <p>{board.description}</p>
                    <p>{board.users_count}/{board.capacity} utilisateurs</p>
                    <p>Code: {board.code}</p>
                    
                    {/*console.log('board details: ' + board)*/}
                    {board.pivot.role_id === 4 && (
                        <div style={{ marginBottom: '20px' }}>
                            <label>Mode édition</label>
                            <Switch
                                checked={isEditingTemplate}
                                onChange={handleEditSwitchChange}
                                color="primary"
                            />
                        </div>
                    )}

                    {board.pivot.role_id === 4 && (
                        <div style={{ marginBottom: '20px' }}>
                            <label>Modifier le Board</label>
                            <Switch
                                checked={isEditingBoard}
                                onChange={handleEditingBoard}
                                color="primary"
                            />
                        </div>
                    )}

                    <div>
                        {isEditingBoard && (
                            <UpdateBoard />
                        )}
                    </div>

                    {isEditingTemplate && ( 
                        <Menu
                            backgroundColor={backgroundColor}
                            setBackgroundColor={setBackgroundColor}
                            backgroundColorOpacity={backgroundColorOpacity}
                            setBackgroundColorOpacity={setBackgroundColorOpacity}
                            backgroundImageOpacity={backgroundImageOpacity}
                            setBackgroundImageOpacity={setBackgroundImageOpacity}
                            resetBackgroundImage={resetBackgroundImage}
                            makeBackgroundColorTransparent={makeBackgroundColorTransparent}
                            itemBorderColor={itemBorderColor}
                            setItemBorderColor={setItemBorderColor}
                            itemTextColor={itemTextColor}
                            setItemTextColor={setItemTextColor}
                            itemFontSize={itemFontSize}
                            setItemFontSize={setItemFontSize}
                            currentShape={currentShape}
                            setCurrentShape={setCurrentShape}
                            addNewItem={addNewItem}
                        />
                    )}

                    {isEditingTemplate && (
                        <div {...getRootProps()} style={{ border: '2px dashed gray', padding: '20px', marginTop: '10px', width: '30%', margin: '0 auto' }}>
                            <input {...getInputProps()} />
                            <p>Glissez une image pour l'utiliser comme fond</p>
                        </div>
                    )}

                    <ResponsiveGridLayout
                        className="layout"
                        layouts={{ lg: layout }}
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 10, sm: 8, xs: 4, xxs: 2 }}
                        rowHeight={30}
                        onLayoutChange={onLayoutChange}
                        compactType="vertical"
                        isResizable={isEditingTemplate}
                        isDraggable={isEditingTemplate}
                        preventCollision={false}
                        style={{
                            height: '65vh',
                            width: '98vw',
                            margin: '0 auto',
                            overflowY: 'auto',
                            border: '1px solid #ccc',
                            padding: '10px',
                            marginTop: '10px',
                        }}
                    >
                        {items.map((item, index) => (
                            <div key={item.id} data-grid={{ i: item.id, x: (index % 3) * 4, y: Math.floor(index / 3), w: 3, h: 1 }}>
                                <DraggableItem key={item.id} item={item}>
                                    <div 
                                        key={item.id} 
                                        style={{ 
                                            border: `1px solid ${itemBorderColor}`, 
                                            padding: '10px', 
                                            backgroundColor: '#ffffff',
                                            color: itemTextColor,
                                            fontSize: itemFontSize,
                                            width: '100%', // Take full width
                                            height: '100%', // Take full height
                                        }}
                                    >
                                        <span className="drag-handle" style={{ cursor: 'move' }}>☰</span>
                                        <strong>{item.content}</strong>
                                    </div>
                                </DraggableItem>
                            </div>
                        ))}

                        {userItems.map((item) => (
                            <div 
                                key={item.id} 
                                data-grid={{ i: item.id, x: 0, y: 0, w: 3, h: 3 }}
                                style={{
                                    border: `1px solid ${itemBorderColor}`,
                                    padding: '10px',
                                    borderRadius: item.type === 'circle' ? '50%' : item.type === 'ellipse' ? '50% / 30%' : item.type === 'triangle' ? '0' : '0',
                                    backgroundColor: item.type === 'circle' || item.type === 'ellipse' ? '#eee' : '#fff',
                                    width: item.type === 'triangle' ? 0 : 'auto',
                                    height: item.type === 'triangle' ? 0 : 'auto',
                                    borderTop: item.type === 'triangle' ? '50px solid transparent' : 'none',
                                    borderBottom: item.type === 'triangle' ? `50px solid ${itemBorderColor}` : 'none',
                                    borderLeft: item.type === 'triangle' ? '25px solid transparent' : 'none',
                                    textAlign: 'center',
                                    position: 'relative',
                                    color: itemTextColor,
                                    fontSize: itemFontSize,
                                }}
                            >
                                <DraggableItem item={item}>
                                    <span className="drag-handle" style={{ cursor: 'move' }}>☰</span>

                                    {item.type === 'text' && editingItemId === item.id ? (
                                        // Toujours afficher l'éditeur TinyMCE pour les éléments de type texte
                                        <>
                                            <input
                                                type="text"
                                                value={item.title}
                                                onChange={(e) => handleTitleChange(e, item.id)}
                                                onBlur={handleTitleBlur}
                                                onKeyDown={(e) => handleTitleKeyDown(e, item.id)}
                                                style={{ width: '100%', marginBottom: '10px' }}
                                            />
                                            <Editor
                                                value={textContent[item.id] || item.content}
                                                onEditorChange={(content) => handleTextChange(content, item.id)}
                                                init={{
                                                    height: 200,
                                                    menubar: false,
                                                    plugins: 'advlist autolink lists link image charmap print preview anchor textcolor',
                                                    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                                }}
                                            />
                                        </>
                                    ) : (
                                        // Afficher un input pour changer le nom des autres types d'éléments (non-texte)
                                        <>
                                            {editingItemId === item.id ? (
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) => handleTitleChange(e, item.id)}
                                                    onBlur={handleTitleBlur}
                                                    onKeyDown={(e) => handleTitleKeyDown(e, item.id)}
                                                    style={{ width: '100%' }}
                                                />
                                            ) : (
                                                <strong onClick={() => handleEdit(item.id)}>{item.title}</strong>
                                            )}
                                        </>
                                    )}

                                    <button 
                                        onClick={() => handleDelete(item.id)} 
                                        style={{ position: 'absolute', top: 0, right: 0 }}
                                    >
                                        X
                                    </button>
                                
                                </DraggableItem>
                            
                            </div>
                        ))}
                    </ResponsiveGridLayout>
                </div>
            </div>
        </DndProvider>
    );
};