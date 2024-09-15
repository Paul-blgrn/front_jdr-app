import React from 'react'

export default  function Menu({
    backgroundColor,
    setBackgroundColor,
    backgroundColorOpacity,
    setBackgroundColorOpacity,
    backgroundImageOpacity,
    setBackgroundImageOpacity,
    resetBackgroundImage,
    makeBackgroundColorTransparent,
    itemBorderColor,
    setItemBorderColor,
    itemTextColor,
    setItemTextColor,
    itemFontSize,
    setItemFontSize,
    currentShape,
    setCurrentShape,
    addNewItem
  }) {
  return (
    <div style={{ margin: '20px' }}>
      <button onClick={addNewItem}>Ajouter un nouvel élément</button>
      <select value={currentShape} onChange={(e) => setCurrentShape(e.target.value)}>
        <option value="rectangle">Rectangle</option>
        <option value="circle">Cercle</option>
        <option value="ellipse">Ellipse</option>
        <option value="triangle">Triangle</option>
        <option value="text">Texte</option>
      </select>

      <div>
        <label>Couleur de fond:</label>
        <input 
          type="color" 
          value={backgroundColor} 
          onChange={(e) => setBackgroundColor(e.target.value)} 
        />
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={backgroundColorOpacity} 
          onChange={(e) => setBackgroundColorOpacity(e.target.value)} 
          style={{ marginLeft: '10px' }}
        />
        <button onClick={makeBackgroundColorTransparent} style={{ marginLeft: '10px' }}>
          Rendre la couleur transparente
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>Opacité de l'image de fond:</label>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={backgroundImageOpacity} 
          onChange={(e) => setBackgroundImageOpacity(e.target.value)} 
        />
        <button onClick={resetBackgroundImage} style={{ marginLeft: '10px' }}>
          Réinitialiser l'image de fond
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>Couleur des bordures des éléments:</label>
        <input 
          type="color" 
          value={itemBorderColor} 
          onChange={(e) => setItemBorderColor(e.target.value)} 
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>Couleur du texte des éléments:</label>
        <input 
          type="color" 
          value={itemTextColor} 
          onChange={(e) => setItemTextColor(e.target.value)} 
        />
      </div>

      <div style={{ marginTop: '20px' }}>
        <label>Taille de la police des éléments:</label>
        <input 
          type="number" 
          value={parseInt(itemFontSize)} 
          onChange={(e) => setItemFontSize(`${e.target.value}px`)} 
        />
      </div>
    </div>
  )
}