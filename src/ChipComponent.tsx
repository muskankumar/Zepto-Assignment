
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './ChipComponent.css';


interface Chip {
  id: number;
  label: string;
  imageUrl:string;
}

const ChipComponent: React.FC = () => {
  
  const [items, setItems] = useState([
    { name: 'John Doe', imageUrl: 'https://cdn-icons-png.flaticon.com/128/2202/2202112.png' },
    { name: 'Jane Smith', imageUrl: 'https://cdn-icons-png.flaticon.com/128/4333/4333609.png' },
    { name: 'Alice Johnson', imageUrl: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png' },
    { name: 'Bob Brown', imageUrl: 'https://cdn-icons-png.flaticon.com/128/6997/6997662.png' },
    { name: 'Nick Giannopoulos', imageUrl: 'https://cdn-icons-png.flaticon.com/128/4140/4140037.png' },
  ]);
  const [chips, setChips] = useState<Chip[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '') {
      
      const lastChip = chips[chips.length - 1];
      if (lastChip) {
        handleChipRemove(lastChip);
      }
    }
  };

  const handleItemClick = (item: {name:string,imageUrl:string}) => {
    
    const newChip: Chip = { id: chips.length + 1, label: item.name,imageUrl:item.imageUrl };
    setChips([...chips, newChip]);

  
    const newItems = items.filter((i) => i.name !== item.name);
    setItems(newItems);

   
    setInputValue('');
  };

  const handleChipRemove = (chip: Chip) => {

    const updatedChips = chips.filter((c) => c.id !== chip.id);
    setChips(updatedChips);

    
    setItems([...items, {name:chip.label,imageUrl:chip.imageUrl}]);
  };

  useEffect(() => {
   
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chips, items]);

  return (
    <div className="chip-container">
      <div className="chips">
        {chips.map((chip) => (
          <div className="user-info-container">
          <img src={chip.imageUrl} alt="User Avatar" className="user-avatar" />
          
          <div key={chip.label} className="user-name">
              {chip.label}
             </div>
             <span className="remove-icon" onClick={() => handleChipRemove(chip)}>
            X
          </span>
        </div>
          
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type to search..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <div className="item-list">
        {items
          .filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()))
          .map((item) => (
            <div className="user-info-container">
      <img src={item.imageUrl} alt="User Avatar" className="user-avatar" />
      
      <div key={item.name} className="user-name" onClick={() => handleItemClick(item)}>
          {item.name}
         </div>
    </div>
        ))}
      </div>
    </div>
  );
};

export default ChipComponent;
