import React from 'react';

// タスクの型定義
type Task = {
  id: number;
  title: string;
  tasks: any[]; 
}

type CardProps = {
  children: React.ReactNode; 
};

const Card: React.FC<CardProps> = ({ children }) => { 
  return (
    <div className='card'>
      {children}
    </div>
  );
};

export default Card;
