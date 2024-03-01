import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Data from "../data/Date";
import Card from "./Card";
import { v4 as uuidv4} from 'uuid';
import { Add,NameAdd } from "./Add";

const Main = () => {
  const [data, setData] = useState(Data);

  const AddTask = (taskTitle:string) => {
      const newSection = {
        id: uuidv4(),
        title: taskTitle,
        names: [],
      };
      setData([...data, newSection]);
    };

    const AddName = (newName: string) => {
      const newMember = {
        id: uuidv4(),
        name: newName,
      };
      
      const newData = data.map(section => ({
        ...section,
        names: section.names.map(name => ({ ...name }))
      }));

      const defaultNameIndex = newData[0].names.findIndex(name => name.name === 'Memberを追加してください');
      if (defaultNameIndex !== -1) {
        newData[0].names[defaultNameIndex] = newMember;
      } else {
        newData[0].names.push(newMember);
      }
      setData(newData)
    }

  const onDragEnd = (result: any) => {

    if (!result.destination) return;
    const { source, destination } = result;

    //動かし始めたcolumnが違うcolumnに移動したら
    if (source.droppableId !== destination.droppableId) {
      //動かし始めたcolumnの配列の番号を取得()
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      console.log(sourceColIndex);
      //動かし終わったcolumnの配列の番号を取得()
      const destinationColIndex = data.findIndex(
        (e) => e.id === destination.droppableId
      );
      console.log(destinationColIndex);

      const sourseCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];

      //動かし始めたタスクに属していたカラムの中のタスクを全て取得
      //後でsplice関数でその動かし始めたタスクを削除するため
      //sourceTaskに配列をコピーしておく(破壊操作を後でするため)
      const sourceTask = [...sourseCol.names];
      console.log(sourceTask);

      //動かし終わったタスクに属していたカラムの中のタスクを全て取得
      //後でsplice関数でその動かし始めたタスクを追加するため
      const destinationTask = [...destinationCol.names];
      console.log(destinationTask);

      //前のカラムから削除
      const [removed] = sourceTask.splice(source.index, 1);
      //後のカラムに追加
      destinationTask.splice(destination.index, 0, removed);

      data[sourceColIndex].names = sourceTask;
      data[destinationColIndex].names = destinationTask;

      setData(data);
    } else {
      //同じカラム内でタスクの入れ替え。
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const sourseCol = data[sourceColIndex];
      console.log(sourseCol);
      const sourceTask = [...sourseCol.names];
      console.log(sourceTask);
      const [removed] = sourceTask.splice(source.index, 1);
      sourceTask.splice(destination.index, 0, removed);

      data[sourceColIndex].names = sourceTask;

      setData(data);
    }
  };


  return (
    <>
    <div className="form-container">
    <NameAdd AddName={AddName}/>
    <Add AddTask={AddTask} />
    </div>
      
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="trello">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div
                className="trello-section"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="trello-section-title">{section.title}</div>
                <div className="trello-section-content">
                  {section.names.map((name, index) => (
                    // <Card key={task.id}>{task.title}</Card>
                    <Draggable
                      key={name.id}
                      draggableId={name.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0.5" : "1",
                          }}
                        >
                          <Card>{name.name}</Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
    </>
  );
};

export default Main;
