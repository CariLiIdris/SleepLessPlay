import { useState } from 'react';
import '../css/Profileform.css'; // Assuming this is the CSS file where styles will be added

const options = [
  {
    value: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2Fcontroller.jpg?alt=media&token=b0a1b9d9-6acb-4ba6-8850-ab718667e9d4',
    label: 'Controller',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2Fcontroller.jpg?alt=media&token=b0a1b9d9-6acb-4ba6-8850-ab718667e9d4',
    imgAlt: 'Aesthetic Controller',
  },
  {
    value: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2FlevelUp.jpg?alt=media&token=9768c8ac-6e8c-40da-9ae5-710590ce4132',
    label: 'Level Up',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2FlevelUp.jpg?alt=media&token=9768c8ac-6e8c-40da-9ae5-710590ce4132',
    imgAlt: 'Aesthetic Text',
  },
  {
    value: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2Flgbtqia%2B.jpg?alt=media&token=26f01dd8-094a-4acf-9fa4-b2ca065bb3a8',
    label: 'Rainbow Alien',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2Flgbtqia%2B.jpg?alt=media&token=26f01dd8-094a-4acf-9fa4-b2ca065bb3a8',
    imgAlt: 'Rainbow alien',
  },
  {
    value: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2Fmario.jpg?alt=media&token=efa20a4f-ea00-42c3-ae74-08b4019b29c5',
    label: 'Mario',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2Fmario.jpg?alt=media&token=efa20a4f-ea00-42c3-ae74-08b4019b29c5',
    imgAlt: 'Mario',
  },
  {
    value: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2FsquidGhost.jpg?alt=media&token=b84f6995-d90e-4cb3-b183-54b6d6a908de',
    label: 'Squid Ghost',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2FsquidGhost.jpg?alt=media&token=b84f6995-d90e-4cb3-b183-54b6d6a908de',
    imgAlt: 'Squid Ghost',
  },
  {
    value: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2FtiredGhost.jpg?alt=media&token=46550852-f119-4469-9f9e-2d52e5cc4f54',
    label: 'Tired Ghost',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2FtiredGhost.jpg?alt=media&token=46550852-f119-4469-9f9e-2d52e5cc4f54',
    imgAlt: 'Tired Ghost',
  },
  {
    value: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2FxboxMan.jpg?alt=media&token=42599c5d-ef5d-453b-9c42-70e80036eec1',
    label: 'Skater Boy',
    imgSrc: 'https://firebasestorage.googleapis.com/v0/b/sleeplessplayarcade.appspot.com/o/UserIcons%2FxboxMan.jpg?alt=media&token=42599c5d-ef5d-453b-9c42-70e80036eec1',
    imgAlt: 'Skater Boy',
  },
];

const CustomDropdown = ({ selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedValue ? (
          <div className="selected-option">
            <img src={options.find(opt => opt.value === selectedValue).imgSrc} alt={options.find(opt => opt.value === selectedValue).imgAlt} />
            <span>{options.find(opt => opt.value === selectedValue).label}</span>
          </div>
        ) : (
          <span>Select an Icon</span>
        )}
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map(option => (
            <div key={option.value} className="dropdown-option" onClick={() => handleOptionClick(option)}>
              <img src={option.imgSrc} alt={option.imgAlt} />
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;