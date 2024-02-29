import React, { useState } from 'react';
import '../index.css';

interface TaskAddFormProps {
  AddTask: (taskTitle: string) => void;
}

interface NameAddFromProps {
  AddName: (newName: string) => void;
}


const Add: React.FC<TaskAddFormProps> = ({ AddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskTitle) return;
    AddTask(taskTitle);
    setTaskTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className='from-container'>
      <input
        className='input-field'
        type="text"
        placeholder="場所を追加"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button type="submit" className='submit-btn'>追加</button>
    </form>
  );
};

const NameAdd: React.FC<NameAddFromProps> = ({ AddName }) => {
  const [newName, setNewName] = useState('');

  const handleAddName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newName) return;
    AddName(newName);
    setNewName('');
  };

  return (
    <div>
      <form className='from-container' onSubmit={handleAddName}>
        <input
          className='input-field'
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Memberを追加"
        />
        <button className='submit-btn' type="submit">追加</button>
      </form>
    </div>
  );
};

export {Add,NameAdd};
