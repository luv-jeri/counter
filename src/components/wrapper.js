import React from 'react';
import './wrapper.css';

const ContentCard = ({ title, onClick, toggle, step }) => {
  return (
    <div
      className='content-card'
      style={{
        backgroundColor: onClick && '#404258',
        position: 'relative',
      }}
      onClick={() => {
        onClick && onClick();
      }}
    >
      {toggle &&
        step?.map((el) => {
          return (
            <span
              style={{
                display: 'flex',
                width: '100%',
                zIndex: 1000,
              }}
            >
              {el}
            </span>
          );
        })}
      <h3>{title}</h3>
    </div>
  );
};

const Card = ({ toShow, current }) => {
  return (
    <div
      style={{
        backgroundColor: current === toShow && '#404258',
      }}
      id={toShow}
      className='menu-card'
    >
      {toShow}
    </div>
  );
};

export default function Wrapper({ children }) {
  const [current, setCurrent] = React.useState('A');
  const [toggle, setToggle] = React.useState(false);

  const data = {
    A: {
      card: [
        {
          title: 'Card 1 for A',
          onClick() {
            alert('Card 1 for A');
          },
          step: ['🔥', '💖'],
        },
        {
          title: 'Card 2 for A',
          onClick() {
            alert('Card 1 for B');
          },
        },
        {
          title: 'Card 3 for A',
          step: ['🔥', '⭐'],
        },
      ],
    },
    B: {
      card: [
        {
          title: 'Card 1 for B',
          step: ['🔥'],
        },
        {
          title: 'Card 2 for B',
          onClick() {
            alert('Card 2 for B');
          },
        },
      ],
    },
    C: {
      card: [
        {
          title: 'Card 1 for C',
        },
      ],
    },
    D: {
      card: [
        {
          title: 'Card 1 for D',
        },
        {
          title: 'Card  2 for D',
        },
        {
          title: 'Card 3 for D',
        },
        {
          title: 'Card 4 for D',
        },
      ],
    },
    E: {
      card: [
        {
          title: 'Card 1 for E',
        },
        {
          title: 'Card 2 for E',
        },
      ],
    },
  };

  const cards = ['A', 'B', 'C', 'D', 'E'];

  const handleClick = (e) => {
    setCurrent(e.target.id);
  };

  return (
    <div className='wrapper-container'>
      <div id='toggle'>
        <button
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          Toggle
        </button>
      </div>
      <div className='wrapper-down'>
        <div onClick={handleClick} className='menu'>
          {cards.map((el) => (
            <Card current={current} toShow={el}></Card>
          ))}
        </div>
        <div className='content'>
          {data[current]?.card.map((el) => {
            return (
              <ContentCard
                title={el.title}
                onClick={el.onClick}
                toggle={toggle}
                step={el.step}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
